const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createToken = (userId) => {
  const token = jwt.sign(userId, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
    expiresIn: '7d',
  });
  return ({ token: `Bearer ${token}` });
};
