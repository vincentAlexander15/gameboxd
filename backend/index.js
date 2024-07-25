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

client.connect().then(() => {
  console.log("Connected correctly to server");

  // Sign up route
  app.post('/signup', async (req, res) => {
  
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
  
    try {
      const db = client.db(dbName);
      const users = db.collection('users');
      const favorites = db.collection('favorites');
      const friends = db.collection('friends')
  
      // Check if user already exists
      const userExists = await users.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }

      //Check that username and password contain only valid characters
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,15}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!usernameRegex.test(username)) {
        return res.status(400).json({ 
          message: 'Username should only contain alphanumeric characters, underscores, and hyphens. It should start with a letter and be 3 to 16 characters long.' 
        });
      }

      if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
          message: 'Password should contain at least one lowercase letter, one uppercase letter, one digit, one special character (@, $, !, %, *, ?, &), and be at least 8 characters long.' 
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Add new user
      const user = users.insertOne({ username, password: hashedPassword });
      await favorites.insertOne({ username: username, games: [] });
      await friends.insertOne({ username: username, userFriends: [] });
      res.status(201).json({ message: 'User created successfully' });
  
    } catch (err) {
      res.status(500).json({ message: 'An error occurred' });
    }
  });

  // User sign in route
  app.post('/signin', async (req, res) => {

    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
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
        // Create and assign a token
        const token = jwt.sign({ username }, jwtscrt);
        res.cookie('cookie-gameboxd', token, { httpOnly: true });
        // Log cookie to console
        console.log(req.cookies);
        res.json({ message: 'User authenticated successfully' });
      } else {
        res.status(400).json({ message: 'User does not exist' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
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

  // Add game to user's favorites
  app.post('/addFavorite', async (req, res) => {
    try {
      const { currentUser, gameID } = req.body;
      const db = client.db(dbName);
      const favorites = db.collection('favorites');
      const userDocument = await favorites.findOne({ username: currentUser });
  
      if (userDocument && userDocument.games.includes(gameID)) {
        res.json({ message: 'Game already in favorites' });
      } else {
        await favorites.updateOne({ username: currentUser }, { $push: { games: gameID } });
        res.json({ message: 'Game added to favorites' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Remove game from user's favorites
  app.post('/removeFavorite', async (req, res) => {
    try {
      const { currentUser, gameID } = req.body;
      const db = client.db(dbName);
      const favorites = db.collection('favorites');
  
      const userDocument = await favorites.findOne({ username: currentUser });
  
      if (userDocument && userDocument.games.includes(gameID)) {
        await favorites.updateOne({ username: currentUser }, { $pull: { games: gameID } });
        res.json({ message: 'Game removed from favorites' });
      } else {
        res.json({ message: 'Game not in favorites' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Get user's favorites
  app.post('/inUserFavorites', async (req, res) => {
    const { currentUser, gameID } = req.body;
    const db = client.db(dbName);
    const favorites = db.collection('favorites');
    const userDocument = await favorites.findOne({ username: currentUser });
  
    if (userDocument && userDocument.games.includes(gameID)) {
      res.json({ isFavorite: true });
    } else {
      res.json({ isFavorite: false });
    }
  });

  app.post('/getUserFavorites', async (req, res) => {
    const { currentUser } = req.body;
    const db = client.db(dbName);
    const favorites = db.collection('favorites');
    const userDocument = await favorites.findOne({ username: currentUser });

    res.json(userDocument.games);
  });

  // Get current user
  app.post('/getCurrentUser', (req, res) => {
    const token = req.cookies['cookie-gameboxd'];
    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    jwt.verify(token, jwtscrt, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        const username = decoded.username;
        res.json({ username });
    });
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
});
