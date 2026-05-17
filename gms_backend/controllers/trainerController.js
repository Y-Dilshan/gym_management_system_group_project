import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";

export const createTrainer = (req, res) => {
  const {
    full_name,
    email,
    password,
    phone,
    profile_picture,
    specification,
    bio,
    experience_years,
  } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // check if email already exists

  const checksql = "SELECT user_id FROM users WHERE email = ?";

  db.query(checksql, [email], (checkErr, checkResults) => {
    if (checkErr) {
      console.log("Error Checking Email", checkErr);
      return res.status(500).json({ error: "failed to validate email" });
    }

    if (checkResults.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    //Hash the password
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.log("Error Hashing password", hashErr);
        return res.status(500).json({ error: "failed to process password" });
      }
    });

    //Insert into users table with role = trainer
    const userSql = `INSERT INTO users (full_name, email, password, phone, role, status, created_at) VALUES (?, ?, ?, ?, 'trainer', 'active', NOW())`;

    db.query(
      userSql,
      [full_name, email, hashedPassword, phone || null],
      (userErr, userResult) => {
        if (userErr) {
          console.error("Error creating user for trainer:", userErr);

          return res
            .status(500)
            .json({ error: "Failed to create trainer account" });
        }

        const newUserId = userResult.insertId;

        // trainer table linked to the new user

        const trainerSql =
          "INSERT INTO trainers (user_id, specification, bio, experience_years) VALUES (?, ?, ?, ?)";

        db.query(
          trainerSql,
          [newUserId, specification, bio || null, experience_years || null],
          (trainerErr, trainerResult) => {
            if (trainerErr) {
              console.error("Error creating trainer profile.", trainerErr);

              //delete the user we just created
              db.query("DELETE FROM users WHERE user_id = ?", [newUserId]);

              return res
                .status(500)
                .json({ error: "failed to create trainer profile" });
            }
            res.status(201).json({
              message: "trainer created successfuly",
              trainerid: trainerResult.insertId,
              userId: newUserId,
            });
          },
        );
      },
    );
  });
};

// Trainer Login

export const trainerLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and Password are required",
    });
  }

  // Join users + trainers to get trainer info

  const sql = `SELECT u.user_id, u.full_name, u.email, u.password, u.phone, u.status, u.created_at, t.trainer_id, t.specification, t.bio, t.experience_years FROM users u JOIN trainers t ON u.user_id = t.user_id WHERE u.email = ? AND u.role = "trainer" `;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error during trainer login:", err);
      return res.status(500).json({ error: "Login failed" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const trainer = results[0];

    if (trainer.status === "inactive") {
      return res.status(403).json({
        error: "Account is inactive",
      });
    }

    bcrypt.compare(password, trainer.password, (campareErr, isMatch) => {
      if (campareErr) {
        console.error("Error comparing password", campareErr);
        return res.status(500).json({
          error: "Login failed",
        });
      }
      if (!isMatch) {
        return res.status(401).json({
          error: "Invalid email or password",
        });
      }
      // Return trainer info  excluding password

      const { password: _, ...trainerData } = trainer;
      res.status(200).json({
        message: "Login successful",
        trainer: trainerData,
      });
    });
  });
};

// Get Trainers

export const getTrainers = (req, res) => {
  const sql = `
    SELECT u.user_id, u.full_name, u.email, u.phone, u.status, u.created_at, t.trainer_id, t.specification, t.bio, t.experience_years FROM users u JOIN trainers t ON u.user_id = t.user_id WHERE u.role = "trainer"
    `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fatching trainers:", err);
      return res.status(500).json({ error: "failed to fetch trainers" });
    }
    res.status(200).json({
      trainers: results,
    });
  });
};
//  GET TRAINER BY ID
export const getTrainerById = (req, res) => {
  const { id } = req.params; // trainer_id
  const sql = `
        SELECT u.user_id, u.full_name, u.email, u.phone, u.status, u.created_at,
               t.trainer_id, t.specialization, t.bio, t.experience_years
        FROM users u
        JOIN trainers t ON u.user_id = t.user_id
        WHERE t.trainer_id = ?
    `;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching trainer:", err);
      return res.status(500).json({ error: "Failed to fetch trainer" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json({ trainer: results[0] });
  });
};

//  UPDATE TRAINER
export const updateTrainer = (req, res) => {
  const { id } = req.params; // trainer Id
  const {
    full_name,
    email,
    phone,
    status,
    profile_picture,
    specification,
    bio,
    experience_years,
  } = req.body;

  //get user id from trainer table
  db.query(
    "SELECT user_id FROM trainers WHERE trainer_id = ?",
    [id],
    (findErr, findREsults) => {
      if (findErr) {
        console.error("Error finding trainer for update", findErr);
        return res.status(500).json({ error: "Failed to update trainer" });
      }
      if (findREsults.length === 0) {
        return res.status(404).json({ error: "Trainer not found" });
      }
      const userID = findREsults[0].user_id;

      //update users table
      const userSql =
        "UPDATE users SET full_name = ?, email = ?, phone =?, status = ? WHERE user_id = ?";

      db.query(
        userSql,
        [full_name, email, phone, status, profile_picture || null, userID],
        (userErr) => {
          if (userErr) {
            console.log("Error updating user info: ", userErr);
            return res.status(500).json({ error: "Failed to update trainer" });
          }
          //update trainers table
          const trainerSql =
            "UPDATE trainers SET specialization = ?, bio = ?, experience_years = ? WHERE trainer_id = ?";
          db.query(
            trainerSql,
            [specialization, bio, experience_years, id],
            (trainerErr) => {
              if (trainerErr) {
                console.error("Error updating trainer profile:", trainerErr);
                return res
                  .status(500)
                  .json({ error: "Failed to update trainer profile" });
              }
              res.status(200).json({ message: "Trainer updated successfully" });
            },
          );
        },
      );
    },
  );
};

// DELETE TRAINER
export const deleteTrainer = (req, res) => {
  const { id } = req.params; // trainer Id

  //get user id from trainer table
  db.query(
    "SELECT user_id FROM trainers WHERE trainer_id = ?",
    [id],
    (findErr, findREsults) => {
      if (findErr) {
        console.error("Error finding trainer for deletion", findErr);
        return res.status(500).json({ error: "Failed to delete trainer" });
      }
      if (findREsults.length === 0) {
        return res.status(404).json({ error: "Trainer not found" });
      }
      const userID = findREsults[0].user_id;

      //Delete trainer and then users

      db.query(
        "DELETE FROM trainers WHERE trainer_id = ?",
        [id],
        (trainerErr) => {
          if (trainerErr) {
            console.error("Error deleting trainer profile:", trainerErr);
            return res.status(500).json({ error: "Failed to delete trainer" });
          }
          db.query(
            "DELETE FROM users WHERE user_id = ?",
            [userID],
            (userErr) => {
              if (userErr) {
                console.error("Error deleting user account:", userErr);
                return res
                  .status(500)
                  .json({ error: "Failed to delete trainer" });
              }
              res.status(200).json({ message: "Trainer deleted successfully" });
            },
          );
        },
      );
    },
  );
};

//GET ASSIGNED MEMBERS FOR A TRAINER
export const getAssignedMembers = (req, res) => {
  const { id } = req.params; // trainer_id
  const sql = `
        SELECT u.user_id, u.full_name, u.email, u.phone, u.status
        FROM users u
        WHERE u.trainer_id = ? AND u.role = 'member'
    `;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching assigned members:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch assigned members" });
    }
    res.status(200).json({ members: results });
  });
};

//UPDATE TRAINER PROFILE

export const updateTrainerProfile = (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM trainers WHERE trainer_id = ?",
    [id],
    (findErr, findResults) => {
      if (findErr) {
        console.error("Error finding trainer:", findErr);
        if (newPicturePath) fs.unlinkSync(newPicturePath); // remove uploaded file on error
        return res.status(500).json({ error: "Failed to update profile" });
      }
      if (findResults.length === 0) {
        if (newPicturePath) fs.unlinkSync(newPicturePath);
        return res.status(404).json({ error: "Trainer not found" });
      }

      const trainerRow = findResults[0];
      const userId = trainerRow.user_id;

      //  Get current user row to access old picture path and current password
      db.query(
        "SELECT * FROM users WHERE user_id = ?",
        [userId],
        (userFindErr, userResults) => {
          if (userFindErr) {
            console.error("Error finding trainer user:", userFindErr);
            if (newPicturePath) fs.unlinkSync(newPicturePath);
            return res.status(500).json({ error: "Failed to update profile" });
          }

          const currentUser = userResults[0];

          // Use new picture if uploaded, otherwise keep existing one
          const profilePicture = newPicturePath || currentUser.profile_picture;

          // Step 3: Hash new password if provided, else keep existing hash
          const doUpdate = (hashedPassword) => {
            // Update users table
            const userSql = `
 UPDATE users 
 SET full_name = ?, phone = ?, password = ?, profile_picture = ?
  WHERE user_id = ?
 `;
            db.query(
              userSql,
              [
                full_name || currentUser.full_name,
                phone || currentUser.phone,
                hashedPassword,
                profilePicture,
                userId,
              ],
              (userUpdateErr) => {
                if (userUpdateErr) {
                  console.error("Error updating trainer user:", userUpdateErr);
                  return res
                    .status(500)
                    .json({ error: "Failed to update profile" });
                }

                // Update trainers table
                const trainerSql = `UPDATE trainers SET specialization = ?, bio = ?, experience_years = ? WHERE trainer_id = ?
 `;
                db.query(
                  trainerSql,
                  [
                    specialization || trainerRow.specialization,
                    bio || trainerRow.bio,
                    experience_years !== undefined
                      ? experience_years
                      : trainerRow.experience_years,
                    id,
                  ],
                  (trainerUpdateErr) => {
                    if (trainerUpdateErr) {
                      console.error(
                        "Error updating trainer profile:",
                        trainerUpdateErr,
                      );
                      return res
                        .status(500)
                        .json({ error: "Failed to update trainer profile" });
                    }

                    // Delete old picture from disk only after successful DB update
                    if (newPicturePath && currentUser.profile_picture) {
                      import("fs").then(({ default: fs }) => {
                        if (fs.existsSync(currentUser.profile_picture)) {
                          fs.unlink(currentUser.profile_picture, (err) => {
                            if (err)
                              console.error(
                                "Could not delete old picture:",
                                err,
                              );
                          });
                        }
                      });
                    }

                    res.status(200).json({
                      message: "Profile updated successfully",
                      profile_picture: profilePicture,
                    });
                  },
                );
              },
            );
          };

          if (password) {
            bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
              if (hashErr) {
                if (newPicturePath) fs.unlinkSync(newPicturePath);
                return res
                  .status(500)
                  .json({ error: "Failed to process password" });
              }
              doUpdate(hashedPassword);
            });
          } else {
            // No password change — keep the existing hashed password
            doUpdate(currentUser.password);
          }
        },
      );
    },
  );
};
