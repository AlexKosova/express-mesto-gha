const userRouter = require('express').Router();

const {
  getUsers, getUserById, updateProfile, updateAvatar, getUser,
} = require('../controllers/users');

userRouter.get('/users', getUsers);
userRouter.get('/users/:userId', getUserById);
userRouter.get('/users/me', getUser);
userRouter.patch('/users/me', updateProfile);
userRouter.patch('/users/me/avatar', updateAvatar);

module.exports = userRouter;
