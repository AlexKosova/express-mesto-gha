const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: 'Бэтмен',
    },
    about: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: 'Не брюс Уэйн. Люблю родителей',
    },
    avatar: {
      type: String,
      default: 'https://i.pinimg.com/originals/ee/48/1d/ee481d7bc5cd593b9330a2156b455d1f.jpg',
    },
  },
  {
    toJSON: { useProjection: true },
  }
);

module.exports = mongoose.model('user', userSchema);
