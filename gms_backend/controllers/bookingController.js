import db from "../config.js";

// Ensure table exists on server start
const initBookingsTable = () => {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS bookings (
      booking_id INT AUTO_INCREMENT PRIMARY KEY,
      member_id INT NOT NULL,
      trainer_id INT NOT NULL,
      booking_date DATE NOT NULL,
      time_slot VARCHAR(50) NOT NULL,
      status VARCHAR(20) DEFAULT 'PENDING',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  db.query(createTableSql, (err) => {
    if (err) console.error("Error creating bookings table:", err);
  });
};
initBookingsTable();

// Helper to check if user is admin
const isAdmin = (user) => user && user.role.toUpperCase() === "ADMIN";
const isTrainer = (user) => user && user.role.toUpperCase() === "TRAINER";

// 1. Create a Trainer Session Booking (Member only)
export const createBooking = (req, res) => {
  const member_id = req.user.user_id;
  const { trainer_id, booking_date, time_slot } = req.body;

  if (!trainer_id || !booking_date || !time_slot) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const formattedDate = typeof booking_date === "string" ? booking_date.split("T")[0] : booking_date;

  // Check if slot already booked for this trainer on this date
  const checkSql = "SELECT * FROM bookings WHERE trainer_id = ? AND booking_date = ? AND time_slot = ? AND status IN ('PENDING', 'ACCEPTED')";
  db.query(checkSql, [trainer_id, formattedDate, time_slot], (err, results) => {
    if (err) {
      console.error("Error checking booking slot availability:", err);
      return res.status(500).json({ error: "Failed to verify slot availability" });
    }

    if (results && results.length > 0) {
      return res.status(409).json({ error: "This time slot is already booked for the selected date" });
    }

    // Insert booking
    const insertSql = "INSERT INTO bookings (member_id, trainer_id, booking_date, time_slot, status) VALUES (?, ?, ?, ?, 'PENDING')";
    db.query(insertSql, [member_id, trainer_id, formattedDate, time_slot], (insertErr, result) => {
      if (insertErr) {
        console.error("Error creating booking:", insertErr);
        return res.status(500).json({ error: "Failed to book session" });
      }

      res.status(201).json({
        message: "Booking requested successfully!",
        booking_id: result.insertId
      });
    });
  });
};

// 2. Get All Bookings (Admin only)
export const getBookings = (req, res) => {
  if (!isAdmin(req.user)) {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  const sql = `
    SELECT b.booking_id, b.booking_date, b.time_slot, b.status, b.booking_date AS created_at,
           COALESCE(u_m.full_name, 'Member') AS member_name, u_m.email AS member_email, u_m.phone AS member_phone,
           COALESCE(u_t.full_name, 'Trainer') AS trainer_name, COALESCE(t.specialization, 'General Fitness') AS trainer_specialization
    FROM bookings b
    LEFT JOIN users u_m ON b.member_id = u_m.user_id
    LEFT JOIN trainers t ON b.trainer_id = t.trainer_id
    LEFT JOIN users u_t ON t.user_id = u_t.user_id
    ORDER BY b.booking_date DESC, b.time_slot ASC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching all bookings:", err);
      return res.status(500).json({ error: "Failed to fetch bookings" });
    }
    res.status(200).json({ bookings: results });
  });
};

// 3. Get Logged In User's (Member's) Bookings
export const getMyBookings = (req, res) => {
  const member_id = req.user.user_id;

  const sql = `
    SELECT b.booking_id, b.booking_date, b.time_slot, b.status, b.booking_date AS created_at, b.trainer_id,
           COALESCE(u_t.full_name, 'Trainer') AS trainer_name,
           COALESCE(t.specialization, 'General Fitness') AS trainer_specialization,
           u_t.profile_picture
    FROM bookings b
    LEFT JOIN trainers t ON b.trainer_id = t.trainer_id
    LEFT JOIN users u_t ON t.user_id = u_t.user_id
    WHERE b.member_id = ?
    ORDER BY b.booking_date DESC, b.time_slot ASC
  `;

  db.query(sql, [member_id], (err, results) => {
    if (err) {
      console.error("Error fetching my bookings:", err);
      return res.status(500).json({ error: "Failed to fetch your bookings" });
    }
    res.status(200).json({ bookings: results });
  });
};

// 4. Get Logged In Trainer's Bookings
export const getTrainerBookings = (req, res) => {
  const user_id = req.user.user_id;

  // First fetch the trainer_id
  db.query("SELECT trainer_id FROM trainers WHERE user_id = ?", [user_id], (err, results) => {
    if (err) {
      console.error("Error finding trainer profile:", err);
      return res.status(500).json({ error: "Failed to fetch trainer bookings" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Trainer profile not found" });
    }

    const trainer_id = results[0].trainer_id;

    const sql = `
      SELECT b.booking_id, b.booking_date, b.time_slot, b.status, b.booking_date AS created_at,
             COALESCE(u_m.full_name, 'Member') AS member_name, u_m.email AS member_email, u_m.phone AS member_phone
      FROM bookings b
      LEFT JOIN users u_m ON b.member_id = u_m.user_id
      WHERE b.trainer_id = ?
      ORDER BY b.booking_date DESC, b.time_slot ASC
    `;

    db.query(sql, [trainer_id], (err, bookingsRes) => {
      if (err) {
        console.error("Error fetching trainer bookings:", err);
        return res.status(500).json({ error: "Failed to fetch trainer bookings" });
      }
      res.status(200).json({ bookings: bookingsRes, trainer_id });
    });
  });
};

// 5. Update Booking Status (Accept/Reject by Trainer, or Cancel by User)
export const updateBookingStatus = (req, res) => {
  const { id } = req.params; // booking_id
  const { status } = req.body;
  const user_id = req.user.user_id;
  const role = req.user.role.toUpperCase();

  const validStatuses = ["PENDING", "ACCEPTED", "REJECTED", "CANCELLED"];
  if (!status || !validStatuses.includes(status.toUpperCase())) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const normalizedStatus = status.toUpperCase();

  // Load the booking to verify permissions
  db.query("SELECT * FROM bookings WHERE booking_id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error loading booking:", err);
      return res.status(500).json({ error: "Failed to update booking status" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = results[0];

    // Check Permissions
    let allowed = false;

    if (role === "ADMIN") {
      allowed = true;
    } else if (role === "TRAINER" && (normalizedStatus === "ACCEPTED" || normalizedStatus === "REJECTED")) {
      allowed = true;
    } else if (role === "MEMBER" && normalizedStatus === "CANCELLED") {
      if (booking.member_id === user_id) {
        allowed = true;
      }
    }

    if (!allowed) {
      return res.status(403).json({ error: "You are not authorized to make this status change" });
    }

    const updateSql = "UPDATE bookings SET status = ? WHERE booking_id = ?";
    db.query(updateSql, [normalizedStatus, id], (updateErr) => {
      if (updateErr) {
        console.error("Error updating booking status:", updateErr);
        return res.status(500).json({ error: "Failed to update booking status" });
      }

      // If accepted by trainer, automatically assign member to this trainer in users table!
      if (normalizedStatus === "ACCEPTED") {
        db.query("UPDATE users SET trainer_id = ? WHERE user_id = ?", [booking.trainer_id, booking.member_id]);
      }

      res.status(200).json({ message: `Booking status updated to ${normalizedStatus} successfully` });
    });
  });
};


// 6. Reschedule / Update Booking details (Member only)
export const updateBooking = (req, res) => {
  const { id } = req.params; // booking_id
  const { booking_date, time_slot } = req.body;
  const member_id = req.user.user_id;

  if (!booking_date || !time_slot) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Load booking and verify ownership
  db.query("SELECT * FROM bookings WHERE booking_id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error loading booking:", err);
      return res.status(500).json({ error: "Failed to reschedule booking" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const booking = results[0];

    if (booking.member_id !== member_id) {
      return res.status(403).json({ error: "Unauthorized to reschedule this booking" });
    }

    // Check availability of new slot
    const checkSql = "SELECT * FROM bookings WHERE trainer_id = ? AND booking_date = ? AND time_slot = ? AND booking_id != ? AND status IN ('PENDING', 'ACCEPTED')";
    db.query(checkSql, [booking.trainer_id, booking_date, time_slot, id], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("Error checking rescheduling availability:", checkErr);
        return res.status(500).json({ error: "Failed to check slot availability" });
      }

      if (checkResults.length > 0) {
        return res.status(409).json({ error: "This slot is already booked for that date" });
      }

      // Update date/time and reset status to PENDING
      const updateSql = "UPDATE bookings SET booking_date = ?, time_slot = ?, status = 'PENDING' WHERE booking_id = ?";
      db.query(updateSql, [booking_date, time_slot, id], (updateErr) => {
        if (updateErr) {
          console.error("Error rescheduling booking:", updateErr);
          return res.status(500).json({ error: "Failed to reschedule booking" });
        }
        res.status(200).json({ message: "Booking rescheduled successfully and set back to Pending." });
      });
    });
  });
};

// 7. Get Booked Slots for a Trainer on a Date
export const getBookedSlots = (req, res) => {
  const { trainer_id } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  const formattedDate = typeof date === "string" ? date.split("T")[0] : date;

  const sql = "SELECT time_slot FROM bookings WHERE trainer_id = ? AND booking_date = ? AND status IN ('PENDING', 'ACCEPTED')";
  db.query(sql, [trainer_id, formattedDate], (err, results) => {
    if (err) {
      console.error("Error fetching booked slots:", err);
      return res.status(500).json({ error: "Failed to check booked slots" });
    }

    const bookedSlots = (results || []).map(r => r.time_slot);
    res.status(200).json({ bookedSlots });
  });
};
