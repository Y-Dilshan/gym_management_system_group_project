import db from "../config.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/mailer.js";

// Apply as a Trainer

export const applyAsTrainer = (req, res) => {
  const { full_name, email, phone, specialization, bio, experience_years } = req.body;

  if (!full_name || !email || !specialization) {
    return res.status(400).json({ error: "Missing required fields" });
  }


  const checkSql = `
        SELECT application_id, status FROM trainer_applications WHERE email = ?`;
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
      const reApplySql = `UPDATE trainer_applications 
                SET full_name = ?, phone = ?, specialization = ?, bio = ?, 
                    experience_years = ?, status = 'pending', applied_at = NOW(), 
                    reviewed_at = NULL, admin_note = NULL
                    WHERE application_id = ?`;
      db.query(
        reApplySql,
        [full_name,phone,specialization,bio || null,experience_years || null,existing.application_id,],
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
    const sql = `INSERT INTO trainer_applications (full_name, email, phone, specialization, bio, experience_years) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      sql,
      [full_name,email,phone || null,specialization,bio || null,experience_years || null,],
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

            const userSql = `INSERT INTO users (full_name, email, password, phone, role, status, created_at) VALUES (?, ?, ?, ?, 'TRAINER', 'ACTIVE', NOW())`;
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

                const expYears = app.experience_years ? parseInt(app.experience_years, 10) : 0;
                const spec = app.specialization || "General Training";
                const bioText = app.bio || "";

                const proceedWithApproval = (newTrainerId) => {
                  // Update users table with trainer_id if column exists
                  db.query(
                    "UPDATE users SET trainer_id = ? WHERE user_id = ?",
                    [newTrainerId, newUserId],
                    (updateUserErr) => {
                      if (updateUserErr) {
                        console.error("Error updating users trainer_id:", updateUserErr);
                      }
                    }
                  );

                  db.query(
                    `UPDATE trainer_applications 
                     SET status = 'approved', reviewed_at = NOW() 
                     WHERE application_id = ?`,
                    [id],
                    (updateErr) => {
                      if (updateErr)
                        console.error("Error updating application status:", updateErr);
                    }
                  );

                  // Send login credentials via email to trainer
                  sendEmail({
                    to: app.email,
                    subject: "Welcome to Power Zone Gym - Your Trainer Account Credentials",
                    html: `
                      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                        <h2 style="color: #D4AF37;">Congratulations ${app.full_name}!</h2>
                        <p>Your application to join <strong>Power Zone Gym</strong> as a Personal Trainer has been <span style="color: green; font-weight: bold;">APPROVED</span>!</p>
                        
                        <p>Below are your temporary login credentials:</p>
                        <div style="background: #f8f9fa; padding: 15px; border-left: 4px solid #D4AF37; margin: 20px 0; border-radius: 4px;">
                          <p style="margin: 5px 0;"><strong>Email:</strong> ${app.email}</p>
                          <p style="margin: 5px 0;"><strong>Temporary Password:</strong> <code style="background: #e9ecef; padding: 2px 6px; font-size: 14px; border-radius: 4px;">${password}</code></p>
                        </div>

                        <p>Please log in to your account and change your password for security.</p>
                        <br/>
                        <p>Best regards,<br/><strong>Power Zone Gym Admin Team</strong></p>
                      </div>
                    `,
                  });

                  res.status(201).json({
                    message: "Application approved. Trainer account created successfully.",
                    trainerId: newTrainerId,
                    userId: newUserId,
                    credentials: {
                      email: app.email,
                      password: password,
                    },
                  });
                };

                const trainerSql1 = `INSERT INTO trainers (user_id, specialization, bio, experience_years) VALUES (?, ?, ?, ?)`;
                db.query(
                  trainerSql1,
                  [newUserId, spec, bioText, expYears],
                  (trainerErr, trainerResult) => {
                    if (!trainerErr) {
                      proceedWithApproval(trainerResult.insertId);
                    } else {
                      console.error("Error creating trainer profile (query 1):", trainerErr);
                      // Fallback query if profile_picture is required in trainers table
                      const trainerSql2 = `INSERT INTO trainers (user_id, specialization, bio, experience_years, profile_picture) VALUES (?, ?, ?, ?, ?)`;
                      db.query(
                        trainerSql2,
                        [newUserId, spec, bioText, expYears, "/default-trainer.png"],
                        (fallbackErr, fallbackResult) => {
                          if (!fallbackErr) {
                            proceedWithApproval(fallbackResult.insertId);
                          } else {
                            console.error("Error creating trainer profile (query 2):", fallbackErr);
                            db.query("DELETE FROM users WHERE user_id = ?", [newUserId]);
                            return res.status(500).json({
                              error: trainerErr.message || fallbackErr.message || "Failed to create trainer profile",
                            });
                          }
                        }
                      );
                    }
                  }
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
 
        const sql = `UPDATE trainer_applications 
            SET status = 'rejected', reviewed_at = NOW(), admin_note = ?
            WHERE application_id = ?`;
        db.query(sql, [admin_note || null, id], (err) => {
            if (err) {
                console.error('Error rejecting application:', err);
                return res.status(500).json({ error: 'Failed to reject application' });
            }
            res.status(200).json({ message: 'Application rejected.' });
        });
    });
};
 