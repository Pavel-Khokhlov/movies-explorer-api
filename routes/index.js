const router = require('express').Router();
const auth = require('../middlewares/auth');

const { validateCreateUser, validateUser } = require('../middlewares/validations');

const {
  createUser,
  login,
} = require('../controllers/users');

const {
  PageNotFoundError,
} = require('../utils/Errors');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateUser, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use((req, res, next) => next(PageNotFoundError()));

module.exports = router;
