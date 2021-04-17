const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
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

app.use('*', cors(options)); // first!!!

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestLogger); // REQUEST LOGGER

app.use(routes);

app.use(errors()); // celebrate errors

// Custom server error handler
app.use((err, req, res, next) => {
  next(); // последний next
  if (err.statusCode === undefined) {
    const { statusCode = 500, message } = err;
    return res
      .status(statusCode)
      .send({
        message: statusCode === 500
          ? 'Internal server error!!!'
          : message,
      });
  }
  return res.status(err.statusCode).send({ message: err.message });
});

app.use(errorLogger); // ERROR LOGGER

app.listen(PORT);
