const { Task } = require('../models/task.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../utils/catchAsync');

const { AppError } = require('../utils/appError');

const taskExistsById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const task = await Task.findOne({
    where: { id, status: 'active' },
    include: [{ model: User }],
  });

  if (!task) {
    return next(
      new AppError(
        'The task does not exist with the given identification or it is not in active state',
        404
      )
    );
  }

  req.task = task;

  next();
});

const taskExistsByStatus = catchAsync(async (req, res, next) => {
  const { status } = req.params;

  if (status === 'active') {
    const task = await Task.findAll({
      where: { status },
      include: [{ model: User }],
    });
    req.task = task;
  } else if (status === 'completed') {
    const task = await Task.findAll({
      where: { status },
      include: [{ model: User }],
    });
    req.task = task;
  } else if (status === 'late') {
    const task = await Task.findAll({
      where: { status },
      include: [{ model: User }],
    });
    req.task = task;
  } else if (status === 'cancelled') {
    const task = await Task.findAll({
      where: { status },
      include: [{ model: User }],
    });
    req.task = task;
  } else {
    return next(new AppError('Status invalid', 404));
  }

  next();
});

module.exports = { taskExistsById, taskExistsByStatus };
