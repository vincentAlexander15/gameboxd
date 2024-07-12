const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());
    
// Dummy database
const users = [];

app.post('/signup', (req, res) => {
  
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check if user already exists
  const userExists = users.find(user => user.username === username);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Add new user
  users.push({ username, password });
  res.status(201).json({ message: 'User created successfully' });

  console.log(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
