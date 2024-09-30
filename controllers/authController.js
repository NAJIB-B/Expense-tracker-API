const {promisify} = require("util")
const jwt = require('jsonwebtoken')

const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const User = require("../models/userModel")
const Expense = require("../models/expenseModel")


exports.protect = catchAsync( async(req, res, next) => {
  let token
  if (req.headers.authorization && (req.headers.authorization).startsWith('Bearer')) {
    token = (req.headers.authorization).split(" ")[1]
  }

  if (!token) {
    return next(new AppError('You need to be logged in to access this route', 401))
  }



  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id) 

  if (!currentUser) {
    return next(new AppError('The user that owns this token, no longer exist', 401))
  }

  req.user = currentUser

  
  next()
})


exports.authorize = catchAsync( async(req, res, next) => {
  
  const expense = await Expense.findById(req.params.id)

  if (!expense) {
    return next(new AppError('No expense found with that ID', 404))
  }

  const userId = ( req.user._id ).toString()

  
  if (expense.owner.toString() !== userId) {
    return next(new AppError('You are not authorized to access this expense', 403))
  }


  next()
})

