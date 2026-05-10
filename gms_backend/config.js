import mysql from 'mysql2';
import env from 'env';

const db = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME
});

db.getConnection((err, connection) => {
    if (err) {
        console.log('Database connection failed');
        console.log(err);
    } else {
        console.log('MySQL Connected');
        connection.release();
    }
});

export default db;