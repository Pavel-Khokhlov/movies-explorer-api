const router = require('express').Router();

const { validateMovie } = require('../middlewares/validations');

const {
  getMyMovies,
  createMovie,
  // deleteMovie,
} = require('../controllers/movies');

router.get('/', getMyMovies);
router.post('/', validateMovie, createMovie);
// router.del('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
