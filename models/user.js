const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const {
  IncorrectEmailPasswordError,
} = require('../utils/Errors');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'E-mail is required'],
  },
  password: {
    type: String,
    minlength: 8,
    select: false,
    required: [true, 'Password is required'],
  },
});

UserSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw IncorrectEmailPasswordError();
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw IncorrectEmailPasswordError();
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', UserSchema);
