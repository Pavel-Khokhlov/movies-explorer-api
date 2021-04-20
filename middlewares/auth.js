const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const { RequiredAuthError, ForbiddenError } = require('../utils/Errors');

module.exports = (req, res, next) => {
  const isAuthorized = req.headers.authorization;
  if (!isAuthorized || !isAuthorized.startsWith('Bearer ')) {
    throw next(RequiredAuthError());
  }
  const token = isAuthorized.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw next(ForbiddenError());
  }
  req.user = payload;
  return next();
};
