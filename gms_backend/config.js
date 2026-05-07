import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user : 'root',
  password : '1234',
  database : 'gym_db'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }else {
    console.log('Connected to the database');
  }
});

export default db;