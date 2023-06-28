const mongoose = require('mongoose');

// eslint-disable-next-line function-paren-newline
const cardSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String,
    required: true,
  },
  link: {
    required: true,
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAr: {
    type: Date,
    default: Date.now,
  },
},
{
  toJSON: { useProjection: true },
},
);

module.exports = mongoose.model('card', cardSchema);
