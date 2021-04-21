const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
  },
  year: {
    type: String,
    required: [true, 'Year is required'],
  },
  description: {
    type: String,
    required: [true, 'Decription is required'],
  },
  image: {
    type: String,
    required: [true, 'URL is required'],
  },
  trailer: {
    type: String,
    required: [true, 'URL is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'URL is required'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  movieId: {
    type: String,
    required: [true, 'MovieId is required'],
  },
  nameRU: {
    type: String,
    required: [true, 'Title is required'],
  },
  nameEN: {
    type: String,
    required: [true, 'Title is required'],
  },
});

module.exports = mongoose.model('movie', MovieSchema);
