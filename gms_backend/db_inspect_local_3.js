import mysql from 'mysql2';
import dotenv from 'dotenv';

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
    const [rows] = await connection.promise().query(`SELECT user_id, full_name, email, role, status, trainer_id FROM users`);
    console.log("Users in Database:");
    console.table(rows);
    connection.release();
    db.end();
});
