const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'yash1234', 
  database: 'invoice_system', 
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); 
  }
  console.log('Connected to the database');
});

module.exports = db;