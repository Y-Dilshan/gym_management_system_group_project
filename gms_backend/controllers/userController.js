import db from "../config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_ROUNDS = 10;
//////////////////////ADMIN -> admin ///////////////////
const isAdmin = (user) => user && user.role.toLowerCase() === "admin";
//////////////////////ADMIN -> admin ///////////////////

export const createUserByAdmin = (req, res) => {
  const user = req.user; // Get from auth middleware

  //   if (!user || user.role !== "admin") {
  //     return res.status(403).json({
  //       message: "Only admins can create users",
  //     });
  //   }

  //////////////////////ADMIN -> admin ///////////////////

  if (!isAdmin(user)) {
    return res.status(403).json({
      message: "Only admins can create users",
    });
  }
  //////////////////////ADMIN -> admin ///////////////////

  const {
    user_id,
    full_name,
    email,
    password,
    phone,
    role,
    status,
    profile_picture,
    created_at,
  } = req.body;

  if (!full_name || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password: ", err);
      return res.status(500).json({ error: "Failed to process password" });
    }

    const sql =
      "INSERT INTO users (user_id, full_name, email, password, phone, role, status, profile_picture, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(
      sql,
      [
        user_id,
        full_name,
        email,
        hashedPassword,
        phone,
        role,
        status,
        profile_picture,
        created_at,
      ],
      (err, result) => {
        if (err) {
          console.error("Error creating user: ", err);
          res.status(500).json({ error: "Failed to create user" });
        } else {
          res.status(201).json({
            message: "User created successfully",
            userId: result.insertId,
          });
        }
      },
    );
  });
};
//////////////////////////////////////////////
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

    const sql = `
        INSERT INTO users
        (full_name, email, password, phone, role, status)
        VALUES (?, ?, ?, ?, ?, ?)
        `;

    db.query(
      sql,
      [full_name, email, hashedPassword, phone, "MEMBER", "ACTIVE"],
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
//////////////////////////////////////////////////////
export const login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user: ", err);
      res.status(500).json({ error: "Failed to fetch user" });
    } else if (results.length === 0) {
      res.status(401).json({ error: "Invalid email or password" });
    } else {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error("Error comparing passwords: ", err);
          res.status(500).json({ error: "Failed to process password" });
        } else if (!isMatch) {
          res.status(401).json({ error: "Invalid email or password" });
        } else {
          // Remove password from response
          const { password, ...userWithoutPassword } = user;

          const token = jwt.sign(
            {
              user_id: user.user_id,
              role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },
          );

          res.status(200).json({
            message: "Login successful",
            token,
            user: userWithoutPassword,
          });
        }
      });
    }
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

  // If password is being updated, hash it first
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

  if (!user || user.role !== "admin") {
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
