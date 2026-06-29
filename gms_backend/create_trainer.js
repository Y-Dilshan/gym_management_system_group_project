import mysql from 'mysql2';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.getConnection(async (err, connection) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }

    const email = 'trainer@gmail.com';
    const password = 'trainer123';
    const hashedPassword = await bcrypt.hash(password, 10);

    // Delete existing trainer with this email if any
    await connection.promise().query(`DELETE FROM users WHERE email = ?`, [email]);

    // Insert user
    const [userRes] = await connection.promise().query(
        `INSERT INTO users (full_name, email, password, phone, role, status) VALUES (?, ?, ?, ?, 'TRAINER', 'ACTIVE')`,
        ['Bob The Trainer', email, hashedPassword, '0771234567']
    );
    const userId = userRes.insertId;

    // Insert trainer profile
    await connection.promise().query(
        `INSERT INTO trainers (user_id, specialization, bio, experience_years, profile_picture) VALUES (?, ?, ?, ?, ?)`,
        [userId, 'Weight Loss & Yoga', 'Certified yoga and strength instructor.', 6, '/default-trainer.png']
    );

    console.log(`Trainer created successfully: ${email}`);
    connection.release();
    db.end();
});
