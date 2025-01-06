require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); // Initialize app

const PORT = process.env.PORT || 5000;
const earningsPerVideo = parseFloat(process.env.EARNINGS_PER_VIDEO) || 1.00;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock database (Consider using a real database like MongoDB or PostgreSQL)
let users = [
  { username: 'testuser', password: 'password123', earnings: 50.00 },
];
let totalEarnings = 100.00;

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Video Earn Backend!');
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: 'Username already exists.' });
  }

  users.push({ username, password, earnings: 0 });
  res.status(201).json({ message: 'Signup successful!', username });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }

  res.status(200).json({ message: 'Login successful!', username });
});

app.post('/video-watched', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(404).json({ error: 'User not found.' });
  }

  user.earnings += earningsPerVideo;
  totalEarnings += earningsPerVideo;

  res.status(200).json({ message: 'Video watched!', earnings: user.earnings });
});

app.post('/withdraw', (req, res) => {
  const { username, amount } = req.body;

  if (!username || !amount || amount <= 0) {
    return res.status(400).json({ error: 'Invalid withdrawal details.' });
  }

  const user = users.find((user) => user.username === username);
  if (!user || user.earnings < amount) {
    return res.status(400).json({ error: 'Insufficient balance or user not found.' });
  }

  user.earnings -= amount;
  totalEarnings -= amount;

  res.status(200).json({
    message: 'Withdrawal successful!',
    remainingBalance: user.earnings,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}/`);
});