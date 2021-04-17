const router = require('express').Router();

const { validateUserBody, validateLogin } = require('../middlewares/validations');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  PageNotFoundError,
} = require('../utils/Errors');

const usersRouter = require('./users');
// const movieRouter = require('./movies');

router.post('/signup', validateUserBody, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', usersRouter);
// router.use('/movies', movieRouter);
router.use((req, res, next) => next(PageNotFoundError()));

module.exports = router;
