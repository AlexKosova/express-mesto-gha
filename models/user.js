const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
      required: true,
    },
    about: {
      minlength: 2,
      maxlength: 30,
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: { useProjection: true },
  },
);

module.exports = mongoose.model('user', userSchema);
