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
    // Update user 28's trainer_id to 3
    await connection.promise().query(`UPDATE users SET trainer_id = 3 WHERE user_id = 28`);
    console.log("Successfully assigned trainer_id=3 to member user_id=28");
    connection.release();
    db.end();
});
