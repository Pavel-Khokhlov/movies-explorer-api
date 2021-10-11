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
        return res.status(200).send({ message: 'У вас нет сохраненных фильмов' });
      }
      return res.status(200).send(movies);
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
    .then((movie) => res.status(200).send({
      _id: movie._id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      owner: movie.owner,
    }))
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const id = req.params;
  Movie.findOne(id).select('+owner')
    .orFail(() => {
      throw next(MovieNotFoundError());
    })
    .then((data) => {
      console.log(data);
      if (String(data.owner) !== owner) {
        return next(ForbiddenError());
      }
      return (data);
    })
    .then((data) => Movie.findByIdAndRemove(data._id))
    .then((data) => res.status(200).send(data))
    .catch(next);
};
