const router = require('express').Router();

const {
  PageNotFoundError,
} = require('../utils/Errors');

const usersRouter = require('./users');
// const movieRouter = require('./movies');

router.use('/users', usersRouter);
// router.use('/movies', movieRouter);
router.use((req, res, next) => next(PageNotFoundError()));

module.exports = router;
