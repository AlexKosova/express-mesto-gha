const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorMiddlware = require('./middlewares/errors');
const routes = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();

// app.use((req, res, next) => {
//   req.user = {
//     _id: '649b58714042af9b50f73492',
//   };

//   next();
// });
app.use(express.json());
app.use(userRouter);
app.use(cardRouter);
app.use(routes);
app.use(errorMiddlware);

async function connect() {
  await mongoose.connect('mongodb://0.0.0.0:27017/mestodb');
  app.listen(PORT,
  //    () => {
  //   console.log('Сервер запущен');
  // }
  // eslint-disable-next-line function-paren-newline
  );
}

connect();
