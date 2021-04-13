const mongoose = require('mongoose');

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

module.exports = mongoose.model('user', UserSchema);
