const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { handleError } = require('./middlewares/handleError');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  PORT, DB_MONGO, Limiter, Options,
} = require('./utils/config');

const app = express();

// CONNECTION TO MONGO
mongoose.connect(DB_MONGO, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use('*', cors(Options)); // FIRST!!!

app.use(requestLogger); // REQUEST LOGGER

app.use(Limiter);

app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.use(errorLogger); // ERROR LOGGER

app.use(errors()); // CELEBRATE ERROR

app.use(handleError); // CUSTOM HANDLER ERRORS

app.listen(PORT);
