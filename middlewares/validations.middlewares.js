const { body, validationResult, param } = require('express-validator');

const createUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Pasword must be at least 8 characters long'),
];

const updateUserValidations = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
];

const createTaskValidations = [
  body('title').notEmpty().withMessage('Title cannot be empty'),
  body('userId')
    .notEmpty()
    .withMessage('UserId cannot be empty')
    .isNumeric()
    .withMessage('Must be a valid numeric'),
  body('limitDate').notEmpty().withMessage('LimitDate cannot be empty'),
];

const updateTaskValidations = [
  body('time').notEmpty().withMessage('Time cannot be empty'),
];

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('. ');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }
  next();
};

module.exports = {
  createUserValidations,
  updateUserValidations,
  createTaskValidations,
  updateTaskValidations,
  checkValidations,
};
