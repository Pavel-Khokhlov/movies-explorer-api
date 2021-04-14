const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');

const app = express();

// CONNECTION TO MONGO
mongoose.connect('mongodb://localhost:27017/numberonedb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const {
  createUser,
  login,
} = require('./controllers/users');

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

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

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

app.listen(PORT);
