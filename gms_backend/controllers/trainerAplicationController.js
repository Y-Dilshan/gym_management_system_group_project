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
      // If rejected → allow to re-apply, update the existing row
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
          message:
            "Application submitted successfully! Please wait for admin review.",
          applicationId: result.insertId,
        });
      },
    );
  });
};
