const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
    },
    about: {
      minlength: 2,
      maxlength: 30,
      type: String,
    },
    avatar: {
      type: String,
    },
  },
);

module.exports = mongoose.model('user', userSchema);
