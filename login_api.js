const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const crypto = require('crypto'); 

const app = express();
app.use(bodyParser.json());

const randomSecret = crypto.randomBytes(32).toString('hex'); 

app.use(session({
  secret: randomSecret, 
  resave: true,
  saveUninitialized: true,
}));

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;


  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ error: 'Login failed' });
    } else {
      if (result.length > 0) {
        const user = result[0];

        req.session.authenticated = true;
        req.session.userId = user.id;

        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    }
  });
});

app.get('/api/users/logout', (req, res) => {
  if (req.session.authenticated) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ error: 'Logout failed' });
      } else {
        res.status(200).json({ message: 'Logout successful' });
      }
    });
  } else {
    res.status(401).json({ error: 'Authentication required' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3000');
});
