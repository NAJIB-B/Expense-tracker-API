const {validationResult} = require('express-validator')

const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')



exports.createExpense = catchAsync( async(req, res, next) => {

  res.status(201).json({
    message: 'success'
  })
})
