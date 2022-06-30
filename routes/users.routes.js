const express = require('express');

const { userExists } = require('../middlewares/users.middlewares');

const {
  createUserValidations,
  updateUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');

const router = express.Router();

router
  .route('/')
  .get(getAllUsers)
  .post(createUserValidations, checkValidations, createUser);

router
  .route('/:id')
  .patch(updateUserValidations, checkValidations, userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
