const router = require('express').Router();

const { validateMovie, validateMovieId } = require('../middlewares/validations');

const {
  getMyMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMyMovies);
router.post('/', validateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
