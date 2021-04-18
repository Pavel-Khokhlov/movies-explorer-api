const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const isAuthorized = req.headers.authorization;
  if (!isAuthorized || !isAuthorized.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Required authorization!!!' });
  }
  const token = isAuthorized.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res
      .status(403)
      .send({ message: 'Access denied!!!' });
  }
  req.user = payload;
  return next();
};
