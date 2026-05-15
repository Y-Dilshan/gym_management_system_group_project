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
    const userSql =
      "INSERT INTO users (full_name, email, password, phone, role, status, created_at) VALUES (?, ?, ?, ?, 'trainer', 'active', NOW())";

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
};
