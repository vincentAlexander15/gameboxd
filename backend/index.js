const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const app = express();
const port = 5000;

const uname = process.env.ATLAS_USERNAME;
const pwd = process.env.ATLAS_PASSWORD;

app.use(bodyParser.json());
app.use(cors());

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

//User sign in
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
      // User is authenticated
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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
