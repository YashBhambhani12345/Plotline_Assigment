const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); 

const app = express();
app.use(bodyParser.json());

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Login failed' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    }
  });
});

app.listen(3002, () => {
  console.log('Server is running on port 3000');
});
