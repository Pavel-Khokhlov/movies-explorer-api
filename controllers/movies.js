const Movie = require('../models/movie');

const {
  FileNotFoundError,
} = require('../utils/Errors');

module.exports.getMyMovies = (req, res, next) => {
  Movie.find({})
    .orFail(() => {
      throw next(FileNotFoundError());
    })
    .populate('owner')
    .then((movies) => res.status(200).send(movies))
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
