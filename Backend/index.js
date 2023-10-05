const express = require('express');
const app = express();
const port = 5000;
require('./db');
const cors = require("cors");

// CORS setup
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
}));

// Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "script-src 'self' https://apis.google.com;");
  next();
});

// Body parsing middleware
app.use(express.json());

// Routes
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/DisplayData'));

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
