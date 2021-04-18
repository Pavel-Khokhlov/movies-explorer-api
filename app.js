const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { handleError } = require('./middlewares/handleError');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB = 'mongodb://localhost:27017/numberonedb' } = process.env;

const app = express();

// CONNECTION TO MONGO
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// CORS
const options = {
  origin: [
    'http://localhost:3000',
    'https://pavel-khokhlov.nomoredomains.icu',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options)); // FIRST!!!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestLogger); // REQUEST LOGGER

app.use(routes);

app.use(errorLogger); // ERROR LOGGER

app.use(errors()); // CELEBRATE ERROR

app.use(handleError); // CUSTOM HANDLER ERRORS

app.listen(PORT);
