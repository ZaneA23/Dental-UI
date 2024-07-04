const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: process.env.example.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get('/api/dentists', (req, res) => {
  db.query('SELECT id, name FROM dentists', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('/api/nurses', (req, res) => {
  db.query('SELECT id, name FROM nurses', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('/api/users', (req, res) => {
  db.query('SELECT id, name FROM users', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

app.get('/api/procedures', (req, res) => {
  db.query('SELECT id, name FROM procedures', (error, results) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
