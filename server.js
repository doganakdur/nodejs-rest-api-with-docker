/** NPM PACKAGES */
const express = require('express');

/** GET ENVIRONMENT VARIABLES */
require('dotenv').config();

/** MONGO CONNECTION */
require('./mongoDb/connectMongo')();

const app = express();

/** This will allow to parse body that gets data from form */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** ROUTES */
const book = require('./routes/book');
app.use('/book', book);

let PORT = process.env.PORT || 3000;
app.listen(PORT);

console.log(`Server is running on port: ${PORT}`);