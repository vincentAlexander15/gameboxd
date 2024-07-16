const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const port = 5000;

const uname = process.env.ATLAS_USERNAME;
const pwd = process.env.ATLAS_PASSWORD;
const jwtscrt = process.env.JWT_SECRET_KEY;

app.use(bodyParser.json());
app.use(cors({ 
  origin: 'http://localhost:3000', 
  credentials: true 
}));

// Connection URL
const url = `mongodb+srv://${uname}:${pwd}@gameboxd.rpwjyu7.mongodb.net/?retryWrites=true&w=majority&appName=gameboxd`;

// Database Name
const dbName = 'gameboxd';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

//User sign up
app.post('/signup', async (req, res) => {
  
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const users = db.collection('users');

    // Check if user already exists
    const userExists = await users.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user
    await users.insertOne({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully' });

  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ message: 'An error occurred' });
  }

  client.close();
});

// User sign in route
app.post('/signin', async (req, res) => {
  
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    const users = db.collection('users');

    // Check if user exists
    const userExists = await users.findOne({ username });
    if (userExists) {
      // Compare password
      const validPassword = await bcrypt.compare(password, userExists.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ username }, jwtscrt);
      res.cookie('cookie-gameboxd', token, { httpOnly: true });
      // log cookies
      console.log(req.cookies);
      res.json({ message: 'User authenticated successfully' });
    } else {
      res.status(400).json({ message: 'User does not exist' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
  
  client.close();
});

// User sign out route
app.post('/signout', (req, res) => {
  // Clear the cookie
  res.clearCookie('cookie-gameboxd');
  
  // Send a response
  res.json({ message: 'User signed out successfully' });
});


// Check if user is logged in

app.get('/checkLoggedIn', (req, res) => {
  try {
    const token = req.cookies['cookie-gameboxd'];
    jwt.verify(token, jwtscrt);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
