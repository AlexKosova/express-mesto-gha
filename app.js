const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const errorMiddlware = require('./middlewares/errors');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());
app.use(userRouter);
app.use(errorMiddlware);

app.use((req, res, next) => {
  req.user = {
    _id: '649a134cd08267ca7e6743cd',
  };

  next();
});

async function connect() {
  await mongoose.connect('mongodb://0.0.0.0:27017/mestodb');
  app.listen(PORT, () => {
    console.log('Сервер запущен');
  });
}

connect();
