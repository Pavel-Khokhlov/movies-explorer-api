const router = require('express').Router();

const { validateUserUpdate } = require('../middlewares/validations');

const {
  getMyProfile,
  updateUser,
} = require('../controllers/users');

router.get('/me', getMyProfile);
router.patch('/me', validateUserUpdate, updateUser);

module.exports = router;
