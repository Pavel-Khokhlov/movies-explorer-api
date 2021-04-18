module.exports.handleError = (err, req, res, next) => {
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
};
