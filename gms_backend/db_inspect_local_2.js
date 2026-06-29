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
    for (const table of ['users', 'trainers', 'products']) {
        const [rows] = await connection.promise().query(`DESCRIBE \`${table}\``);
        console.log(`\nTable: ${table}`);
        console.table(rows);
    }
    connection.release();
    db.end();
});
