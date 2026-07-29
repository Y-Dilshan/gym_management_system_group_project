import db from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
const isAdmin = (user) => user && user.role.toLowerCase() === "admin";

export const createUserByAdmin = (req, res) => {
  const user = req.user; 

  // if (!isAdmin(user)) {
  //   return res.status(403).json({
  //     message: "Only admins can create users",
  //   });
  // }
  db.query("SELECT COUNT(*) AS count FROM admins", (err, result) => {

    if (err) {
        return res.status(500).json({
            error: "Failed to verify admin"
        });
    }

    const adminExists = result[0].count > 0;

    if (adminExists) {

        const user = req.user;

        if (!isAdmin(user)) {
            return res.status(403).json({
                message: "Only admins can create users"
            });
        }
    }

  const { full_name, email, password, phone, role, status, profile_picture } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const normalizedRole = role ? role.toUpperCase() : "MEMBER";
  const normalizedStatus = status ? status.toUpperCase() : "ACTIVE";

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password: ", err);

      return res.status(500).json({
        error: "Failed to process password",
      });
    }

    if (normalizedRole === "ADMIN") {
      const userSql = `INSERT INTO users (full_name, email, password, phone, role, status, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        userSql,
        [
          full_name,
          email,
          hashedPassword,
          phone,
          normalizedRole,
          normalizedStatus,
          profile_picture || null
        ],
        (err, result) => {
          if (err) {
            console.error("Error creating admin user:", err);

            return res.status(500).json({
              error: "Failed to create admin user",
            });
          }

          // Insert into admins table AFTER user exists
          const adminSql = `INSERT INTO admins (user_id,position) VALUES (?, ?)`;

          db.query(
            adminSql,
            [result.insertId, "Manager"],
            (err, adminResult) => {
              if (err) {
                console.error("Error creating admin:", err);

                return res.status(500).json({
                  error: "Failed to create admin",
                });
              }

              return res.status(201).json({
                message: "Admin created successfully",
                userId: result.insertId,
                admin_id: adminResult.insertId,
              });
            },
          );
        },
      );
    } else if (normalizedRole === "TRAINER") {
      // FIRST create user
      const userSql = `INSERT INTO users (full_name, email, password, phone, role, status, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        userSql,
        [
          full_name,
          email,
          hashedPassword,
          phone,
          normalizedRole,
          normalizedStatus,
          profile_picture || null
        ],
        (err, userResult) => {
          if (err) {
            console.error("Error creating trainer user:", err);

            return res.status(500).json({
              error: "Failed to create trainer user",
            });
          }

          // GET created user_id
          const createdUserId = userResult.insertId;

          const { specialization, bio, experience_years } = req.body;

          const trainerSql = `INSERT INTO trainers (user_id, specialization, bio, experience_years, profile_picture) VALUES (?, ?, ?, ?, ?)`;

          db.query(
            trainerSql,
            [
              createdUserId,
              specialization || "",
              bio || "",
              experience_years || 0,
              profile_picture || "/default-trainer.png",
            ],
            (err, trainerResult) => {
              if (err) {
                console.error("Error creating trainer profile:", err);
                db.query("DELETE FROM users WHERE user_id = ?", [createdUserId]);
                return res.status(500).json({
                  error: "Failed to create trainer profile",
                });
              }

              return res.status(201).json({
                message: "Trainer created successfully",
                trainerId: trainerResult.insertId,
              });
            },
          );
        },
      );
    } else {
      const sql = `INSERT INTO users (full_name, email, password, phone, role, status, profile_picture) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      db.query(
        sql,
        [
          full_name,
          email,
          hashedPassword,
          phone,
          normalizedRole,
          normalizedStatus,
          profile_picture || null
        ],
        (err, result) => {
          if (err) {
            console.error("Error creating user: ", err);

            return res.status(500).json({
              error: "Failed to create user",
            });
          }

          return res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
          });
        },
      );
    }
  });
});
};

export const register = (req, res) => {
  const { full_name, email, password, phone } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to process password",
      });
    }

    const sql = `INSERT INTO users (full_name, email, password, phone, role, status) VALUES (?, ?, ?, ?, 'MEMBER', 'ACTIVE')`;

    db.query(
      sql,
      [full_name, email, hashedPassword, phone],
      (err, result) => {
        if (err) {
          console.error(err);

          return res.status(500).json({
            error: "Failed to register user",
          });
        }

        return res.status(201).json({
          message: "Registration successful",
        });
      },
    );
  });
};

///////////////////////////////////login/////////////////////////////
export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({
        error: "Failed to fetch user",
      });
    }

    if (results.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({
          error: "Failed to process password",
        });
      }

      if (!isMatch) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }

      // Remove password from the user object before sending response
      const { password: hashedPassword, ...userWithoutPassword } = user;

      const token = jwt.sign(
        {
          user_id: user.user_id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
    });
  });
};

export const getUsers = (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users: ", err);
      res.status(500).json({ error: "Failed to fetch users" });
    } else {
      // Remove password from response
      const usersWithoutPassword = results.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      res.status(200).json({ users: usersWithoutPassword });
    }
  });
};

export const getUserById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM users WHERE user_id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching user: ", err);
      res.status(500).json({ error: "Failed to fetch user" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      // Remove password from response
      const { password, ...userWithoutPassword } = results[0];
      res.status(200).json({ user: userWithoutPassword });
    }
  });
};

export const updateUser = (req, res) => {
  const { id } = req.params;
  const { full_name, email, password, phone, role, status, profile_picture } =
    req.body;

  if (password) {
    bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password: ", err);
        return res.status(500).json({ error: "Failed to process password" });
      }

      const sql =
        "UPDATE users SET full_name = ?, email = ?, password = ?, phone = ?, role = ?, status = ?, profile_picture = ? WHERE user_id = ?";
      db.query(
        sql,
        [
          full_name,
          email,
          hashedPassword,
          phone,
          role,
          status,
          profile_picture,
          id,
        ],
        (err, result) => {
          if (err) {
            console.error("Error updating user: ", err);
            res.status(500).json({ error: "Failed to update user" });
          } else if (result.affectedRows === 0) {
            res.status(404).json({ error: "User not found" });
          } else {
            res.status(200).json({ message: "User updated successfully" });
          }
        },
      );
    });
  } else {
    const sql =
      "UPDATE users SET full_name = ?, email = ?, phone = ?, role = ?, status = ?, profile_picture = ? WHERE user_id = ?";
    db.query(
      sql,
      [full_name, email, phone, role, status, profile_picture, id],
      (err, result) => {
        if (err) {
          console.error("Error updating user: ", err);
          res.status(500).json({ error: "Failed to update user" });
        } else if (result.affectedRows === 0) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.status(200).json({ message: "User updated successfully" });
        }
      },
    );
  }
};

export const deleteUser = (req, res) => {
  const user = req.user; // Get from auth middleware

  if (!isAdmin(user)) {
    return res.status(403).json({
      message: "Only admins can delete users",
    });
  }

  const { id } = req.params;
  const sql = "DELETE FROM users WHERE user_id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user: ", err);
      res.status(500).json({ error: "Failed to delete user" });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
};

export const googleLogin = (req, res) => {
  const { email, full_name, profile_picture } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking Google user:", err);
      return res.status(500).json({ error: "Google Login failed" });
    }

    if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign(
        { user_id: user.user_id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      const { password, ...userWithoutPassword } = user;
      return res.status(200).json({
        message: "Login successful",
        token,
        user: userWithoutPassword,
      });
    } else {
      // Hashing a random dummy password in case database requires NOT NULL on password field
      const randomPassword = "GOOGLE_AUTH_" + Math.random().toString(36).slice(-8);
      bcrypt.hash(randomPassword, SALT_ROUNDS, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Error hashing dummy password:", hashErr);
          return res.status(500).json({ error: "Failed to process security details" });
        }

        const insertSql =
          "INSERT INTO users (full_name, email, password, role, status, profile_picture) VALUES (?, ?, ?, 'MEMBER', 'ACTIVE', ?)";
        db.query(
          insertSql,
          [full_name || email.split("@")[0], email, hashedPassword, profile_picture || null],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Error creating Google user:", insertErr);
              return res.status(500).json({ error: "Failed to create account" });
            }

            const newUserId = result.insertId;
            db.query("SELECT * FROM users WHERE user_id = ?", [newUserId], (fetchErr, fetchResults) => {
              if (fetchErr || fetchResults.length === 0) {
                return res.status(500).json({ error: "Failed to load profile" });
              }

              const newUser = fetchResults[0];
              const token = jwt.sign(
                { user_id: newUser.user_id, role: newUser.role },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
              );
              const { password, ...userWithoutPassword } = newUser;
              return res.status(201).json({
                message: "Registration and login successful",
                token,
                user: userWithoutPassword,
              });
            });
          }
        );
      });
    }
  });
};

export const getAdminStats = (req, res) => {
  const user = req.user;
  if (!isAdmin(user)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  const queries = {
    users: "SELECT COUNT(*) AS count FROM users",
    products: "SELECT COUNT(*) AS count FROM products",
    orders: "SELECT COUNT(*) AS count FROM orders",
    revenue: "SELECT SUM(total_amount) AS revenue FROM orders WHERE order_status != 'CANCELLED'"
  };

  db.query(queries.users, (err, usersRes) => {
    if (err) return res.status(500).json({ error: err.message });

    db.query(queries.products, (err, productsRes) => {
      if (err) return res.status(500).json({ error: err.message });

      db.query(queries.orders, (err, ordersRes) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query(queries.revenue, (err, revenueRes) => {
          if (err) return res.status(500).json({ error: err.message });

          return res.status(200).json({
            totalUsers: usersRes[0].count,
            totalProducts: productsRes[0].count,
            totalOrders: ordersRes[0].count,
            totalRevenue: revenueRes[0].revenue || 0
          });
        });
      });
    });
  });
};
