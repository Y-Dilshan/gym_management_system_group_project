import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const tables = ['users', 'trainers', 'products', 'orders', 'order_items', 'trainer_applications'];

db.getConnection(async (err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
        process.exit(1);
    }
    console.log('Database connected successfully');

    for (const table of tables) {
        try {
            const [rows] = await connection.promise().query(`DESCRIBE \`${table}\``);
            console.log(`\nTable: ${table}`);
            console.table(rows);
        } catch (queryErr) {
            console.error(`Error describing table ${table}:`, queryErr.message);
        }
    }
    
    connection.release();
    db.end();
});
