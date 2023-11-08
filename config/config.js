require('dotenv').config();
const mySql = require('mysql2');

const db = mySql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.message);
  } else {
    console.log('Koneksi ke database berhasil');
  }
});

module.exports = db;