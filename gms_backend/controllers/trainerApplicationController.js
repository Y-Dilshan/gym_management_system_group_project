import db from "../config.js";
import bcrypt from "bcrypt";

// Apply as a Trainer

export const applyAsTrainer = (req, res) => {
  const { full_name, email, phone, specialization, bio, experience_years } =
    req.body;

  if (!full_name || !email || !specialization) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  /////////// Check if already applied with same email

  const checkSql = `
        SELECT application_id, status FROM trainer_applications WHERE email = ?
    `;
  db.query(checkSql, [email], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking application:", checkErr);
      return res.status(500).json({ error: "Failed to submit application" });
    }

    if (checkResults.length > 0) {
      const existing = checkResults[0];
      if (existing.status === "pending") {
        return res
          .status(409)
          .json({ error: "You already have a pending application" });
      }
      if (existing.status === "approved") {
        return res.status(409).json({
          error:
            "Your application was already approved. Contact admin for login credentials.",
        });
      }
      const reApplySql = `
                UPDATE trainer_applications 
                SET full_name = ?, phone = ?, specialization = ?, bio = ?, 
                    experience_years = ?, status = 'pending', applied_at = NOW(), 
                    reviewed_at = NULL, admin_note = NULL
                WHERE application_id = ?
            `;
      db.query(
        reApplySql,
        [
          full_name,
          phone,
          specialization,
          bio || null,
          experience_years || null,
          existing.application_id,
        ],
        (reApplyErr) => {
          if (reApplyErr) {
            console.error("Error re-applying:", reApplyErr);
            return res
              .status(500)
              .json({ error: "Failed to submit application" });
          }
          return res.status(200).json({
            message:
              "Application re-submitted successfully. Please wait for admin review.",
          });
        },
      );
      return;
    }
    const sql = `
            INSERT INTO trainer_applications (full_name, email, phone, specialization, bio, experience_years)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    db.query(
      sql,
      [
        full_name,
        email,
        phone || null,
        specialization,
        bio || null,
        experience_years || null,
      ],
      (err, result) => {
        if (err) {
          console.error("Error submitting application:", err);
          return res
            .status(500)
            .json({ error: "Failed to submit application" });
        }
        res.status(201).json({
          message: "Application submitted successfully!",
          applicationId: result.insertId,
        });
      },
    );
  });
};
///////Get Application

export const getApplications = (req, res) => {
  const { status } = req.query;

  let sql = "SELECT * FROM trainer_applications";
  const params = [];

  if (status) {
    sql += " WHERE status = ?";
    params.push(status);
  }

  sql += " ORDER BY applied_at DESC";

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error fetching applications:", err);
      return res.status(500).json({ error: "Failed to fetch applications" });
    }
    res.status(200).json({ applications: results });
  });
};

///////Get Application by Id

export const getApplicationById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM trainer_applications WHERE application_id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching application:", err);
        return res.status(500).json({ error: "Failed to fetch application" });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }
      res.status(200).json({ application: results[0] });
    },
  );
};

/////// Approve application and create trainer account

export const approveApplication = (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  if (!password) {
    return res
      .status(400)
      .json({ error: "Password is required to create trainer account" });
  }

  db.query(
    "SELECT * FROM trainer_applications WHERE application_id = ?",
    [id],
    (findErr, findResults) => {
      if (findErr) {
        console.error("Error finding application:", findErr);
        return res.status(500).json({ error: "Failed to approve application" });
      }
      if (findResults.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      const app = findResults[0];

      if (app.status === "approved") {
        return res.status(409).json({ error: "Application already approved" });
      }

      db.query(
        "SELECT user_id FROM users WHERE email = ?",
        [app.email],
        (emailErr, emailResults) => {
          if (emailErr) {
            console.error("Error checking email:", emailErr);
            return res
              .status(500)
              .json({ error: "Failed to approve application" });
          }
          if (emailResults.length > 0) {
            return res
              .status(409)
              .json({ error: "A user with this email already exists" });
          }

          bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
            if (hashErr) {
              console.error("Error hashing password:", hashErr);
              return res
                .status(500)
                .json({ error: "Failed to process password" });
            }

            const userSql = `
                    INSERT INTO users (full_name, email, password, phone, role, status, created_at)
                    VALUES (?, ?, ?, ?, 'trainer', 'active', NOW())
                `;
            db.query(
              userSql,
              [app.full_name, app.email, hashedPassword, app.phone],
              (userErr, userResult) => {
                if (userErr) {
                  console.error("Error creating user:", userErr);
                  return res
                    .status(500)
                    .json({ error: "Failed to create trainer account" });
                }

                const newUserId = userResult.insertId;

                const trainerSql = `
                        INSERT INTO trainers (user_id, specialization, bio, experience_years)
                        VALUES (?, ?, ?, ?)
                    `;
                db.query(
                  trainerSql,
                  [
                    newUserId,
                    app.specialization,
                    app.bio,
                    app.experience_years,
                  ],
                  (trainerErr, trainerResult) => {
                    if (trainerErr) {
                      console.error(
                        "Error creating trainer profile:",
                        trainerErr,
                      );

                      db.query("DELETE FROM users WHERE user_id = ?", [
                        newUserId,
                      ]);
                      return res
                        .status(500)
                        .json({ error: "Failed to create trainer profile" });
                    }

                    db.query(
                      `UPDATE trainer_applications 
                                 SET status = 'approved', reviewed_at = NOW() 
                                 WHERE application_id = ?`,
                      [id],
                      (updateErr) => {
                        if (updateErr)
                          console.error(
                            "Error updating application status:",
                            updateErr,
                          );
                      },
                    );

                    res.status(201).json({
                      message:
                        "Application approved. Trainer account created successfully.",
                      trainerId: trainerResult.insertId,
                      userId: newUserId,
                      credentials: {
                        email: app.email,
                        password: password,
                      },
                    });
                  },
                );
              },
            );
          });
        },
      );
    },
  );
};

////////Reject application

export const rejectApplication = (req, res) => {
    const { id } = req.params;
    const { admin_note } = req.body;
 
    db.query('SELECT * FROM trainer_applications WHERE application_id = ?', [id], (findErr, findResults) => {
        if (findErr) {
            console.error('Error finding application:', findErr);
            return res.status(500).json({ error: 'Failed to reject application' });
        }
        if (findResults.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }
        if (findResults[0].status === 'approved') {
            return res.status(409).json({ error: 'Cannot reject an already approved application' });
        }
 
        const sql = `
            UPDATE trainer_applications 
            SET status = 'rejected', reviewed_at = NOW(), admin_note = ?
            WHERE application_id = ?
        `;
        db.query(sql, [admin_note || null, id], (err) => {
            if (err) {
                console.error('Error rejecting application:', err);
                return res.status(500).json({ error: 'Failed to reject application' });
            }
            res.status(200).json({ message: 'Application rejected.' });
        });
    });
};
 