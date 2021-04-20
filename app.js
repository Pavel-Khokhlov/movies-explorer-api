const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { handleError } = require('./middlewares/handleError');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_MONGO } = require('./utils/config');

// LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const app = express();

// CONNECTION TO MONGO
mongoose.connect(DB_MONGO, {
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

app.use(requestLogger); // REQUEST LOGGER

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.use(errorLogger); // ERROR LOGGER

app.use(errors()); // CELEBRATE ERROR

app.use(handleError); // CUSTOM HANDLER ERRORS

app.listen(PORT);
