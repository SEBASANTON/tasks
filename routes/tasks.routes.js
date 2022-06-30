const express = require('express');

const {
  taskExistsById,
  taskExistsByStatus,
} = require('../middlewares/tasks.middlewares');

const {
  createTaskValidations,
  updateTaskValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

const {
  getAllTasks,
  createTask,
  getByStatus,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const router = express.Router();

router
  .route('/')
  .get(getAllTasks)
  .post(createTaskValidations, checkValidations, createTask);

router.route('/:status').get(taskExistsByStatus, getByStatus);

router
  .route('/:id')
  .patch(updateTaskValidations, checkValidations, taskExistsById, updateTask)
  .delete(taskExistsById, deleteTask);

module.exports = { tasksRouter: router };
