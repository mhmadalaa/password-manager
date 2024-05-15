require('dotenv').config();

const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/userRouter');
const passwordRouter = require('./routers/passwordRouter');

const app = express();

// allow express to accept json format data
app.use(express.json());

// HTTP request logger
app.use(morgan('dev'));

// ROUTERS
app.use('/passwords', passwordRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
  // This code will be executed when a GET request is made to the base URL
  res.send('<center><h1>welcome to password manager api</h1></center>');
});

// DB connection URI
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// Connect to DB with mongoose ODM
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => {
    console.log('DB connecting successful...');
  })
  .catch((err) => {
    console.log('DB connection ERROR!!');
  });

// SERVER CONNECTION
app.listen(3000, () => {
  console.log('listening on port 3000');
});

// Allow Vercel to turn Express into a serverless function
module.exports = app;
