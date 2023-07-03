const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: 'Жак-Ив Кусто',
    },
    about: {
      minlength: 2,
      maxlength: 30,
      type: String,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Некорректный формат почты',
      },
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    toJSON: { useProjection: true },
  },
);

module.exports = mongoose.model('user', userSchema);
