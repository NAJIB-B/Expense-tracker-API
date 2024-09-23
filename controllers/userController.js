const {validationResult} = require("express-validator")
const jwt = require('jsonwebtoken')

const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const User = require("../models/userModel")


const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}


exports.createUser = catchAsync( async(req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }

  const user = await User.create(req.body)

  const token = signToken(user._id)

  user.password = undefined

  res.status(201).json({
    staus: 'success',
    token,
    user
  })

})


exports.login = catchAsync( async(req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }

  const user = await User.findOne({email: req.body.email}).select('+password')
  console.log('user found', user)

  if (!user || !( await user.confirmPassword(req.body.password, user.password ))) {
    return next(new AppError('Email or password is wrong', 400))
  }

  const token = signToken(user._id)

  user.password = undefined

  res.status(200).json({
    staus: 'success',
    token,
    user
  })

})

