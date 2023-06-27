const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    minlength: 2,
    maxlength: 30,
    type: String
  },
  link: {
    required: true,
    type: String
  },
  owner: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: [],
    ref: "user",
  }],
  createdAr: {
    type: Date,
    default: Date.now,
  }
})

module.exports = mongoose.model('card', cardSchema);