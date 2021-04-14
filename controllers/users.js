const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  EmailExistsError,
} = require('../errors/Errors');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  User
    .findOne({ email })
    .then((user) => {
      if (user) {
        throw EmailExistsError(email);
      }
      return bcrypt
        .hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(201).send({ _id: user._id, email: user.email }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // create token
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
        expiresIn: '7d',
      });
      // send token
      res.send({ token: `Bearer ${token}` });
    })
    .catch(next);
};
