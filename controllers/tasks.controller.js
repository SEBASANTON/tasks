const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');

const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.findAll({
    include: [{ model: User }],
  });

  res.status(200).json({
    tasks,
  });
});

const createTask = catchAsync(async (req, res, next) => {
  const { title, userId, limitDate } = req.body;

  const newTask = await Task.create({
    title,
    userId,
    limitDate,
  });

  res.status(201).json({
    newTask,
  });
});

const getByStatus = catchAsync(async (req, res, next) => {
  const { task } = req;
  res.status(200).json({
    task,
  });
});

const updateTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  const { time } = req.body;

  await task.update({ finishDate: time });

  if (task.limitDate >= task.finishDate) {
    await task.update({ status: 'completed' });
  } else {
    await task.update({ status: 'late' });
  }
  res.status(200).json({
    status: 'success',
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  const { task } = req;

  await task.update({ status: 'cancelled' });

  res.status(200).json({
    status: 'success',
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getByStatus,
  updateTask,
  deleteTask,
};
