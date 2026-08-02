import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,

    ssl: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: true
    },

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connected successfully');
        // Ensure schema columns exist on users table across all environments
        connection.query("ALTER TABLE users ADD COLUMN trainer_id INT DEFAULT NULL", () => {});
        connection.query("ALTER TABLE users ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL", () => {});
        connection.query("ALTER TABLE users ADD COLUMN reset_token_expiry DATETIME DEFAULT NULL", () => {});
        connection.query("ALTER TABLE users MODIFY COLUMN profile_picture LONGTEXT", () => {});

        // Ensure bookings table schema columns exist across all environments
        const createBookingsTableSql = `
            CREATE TABLE IF NOT EXISTS bookings (
                booking_id INT AUTO_INCREMENT PRIMARY KEY,
                member_id INT NOT NULL,
                trainer_id INT NOT NULL,
                booking_date DATE NOT NULL,
                time_slot VARCHAR(50) NOT NULL,
                status VARCHAR(20) DEFAULT 'PENDING',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        connection.query(createBookingsTableSql, () => {
            connection.query("ALTER TABLE bookings ADD COLUMN trainer_id INT NOT NULL", () => {});
            connection.query("ALTER TABLE bookings ADD COLUMN member_id INT NOT NULL", () => {});
            connection.query("ALTER TABLE bookings ADD COLUMN booking_date DATE NOT NULL", () => {});
            connection.query("ALTER TABLE bookings ADD COLUMN time_slot VARCHAR(50) NOT NULL", () => {});
            connection.query("ALTER TABLE bookings ADD COLUMN status VARCHAR(20) DEFAULT 'PENDING'", () => {});
            connection.query("ALTER TABLE bookings MODIFY COLUMN class_id INT DEFAULT NULL", () => {});
            connection.query("ALTER TABLE bookings DROP FOREIGN KEY fk_booking_member", () => {});
        });

        connection.release();
    }
});

export default db; 