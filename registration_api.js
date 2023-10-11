const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/api/users/register', (req, res) => {
  const { name, email, password } = req.body;


  const user = { name, email, password };
  const sql = 'INSERT INTO users SET ?';

  db.query(sql, user, (err, result) => {
    if (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ error: 'Registration failed' });
    } else {
      res.status(200).json({ message: 'Registration successful' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
