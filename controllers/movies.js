const Movie = require('../models/movie');

const {
  MovieNotFoundError,
  ForbiddenError,
  FileNotFoundError,
} = require('../utils/Errors');

module.exports.getMyMovies = (req, res, next) => {
  Movie.find({})
    .orFail(() => {
      throw next(FileNotFoundError());
    })
    .populate('owner')
    .then((movies) => {
      if (!movies) {
        throw next(FileNotFoundError());
      }
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(200).send(movie))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const movie = req.params.movieId;
  Movie.findById(movie).select('+owner')
    .orFail(() => {
      throw next(MovieNotFoundError());
    })
    .then((data) => {
      if (String(data.owner) !== owner) {
        return next(ForbiddenError());
      }
      return (data);
    })
    .then((data) => Movie.findByIdAndRemove(data._id))
    .then((data) => res.status(200).send(data))
    .catch(next);
};
