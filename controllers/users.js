const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  EmailExistsError,
  RequiredAuthError,
  UserNotFoundError,
} = require('../utils/Errors');

const { createToken, verifyToken } = require('../utils/Jwt');

const SALT_ROUNDS = 10;

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw EmailExistsError(email);
      }
      return bcrypt.hash(password, SALT_ROUNDS);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      const token = createToken({ _id: user._id });
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
        token: token.token,
      });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken({ _id: user._id });
      res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
        token: token.token,
      });
    })
    .catch(next);
};

module.exports.getMyProfile = (req, res, next) => {
  const token = req.headers.authorization.replace('Bearer ', '');
  const isAuthorized = () => {
    try {
      return verifyToken(token);
    } catch (err) {
      return false;
    }
  };
  if (!isAuthorized(token)) {
    throw next(RequiredAuthError());
  }
  const userId = isAuthorized(token);
  return User.findById(userId._id)
    .then((user) => {
      if (!user) {
        throw next(UserNotFoundError());
      }
      return res.status(200).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const owner = req.user._id;
  User.findByIdAndUpdate(
    owner,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};
