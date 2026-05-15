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

          return res.status(500).json({error: "Failed to create trainer account"})
        }

        const newUserId = userResult.insertId;

        // trainer table linked to the new user

        const trainerSql = "INSERT INTO trainers (user_id, )"
      },
    );
  });
};
