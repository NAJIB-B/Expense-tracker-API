const {validationResult} = require("express-validator")
const jwt = require('jsonwebtoken')

const {promisify} = require("util")

const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const User = require("../models/userModel")


const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
  })
}

const signRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET,{
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
  })
}


exports.createUser = catchAsync( async(req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400))
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new AppError(
        "The password and confirmPassword field has to be the same",
        400,
      ),
    );
  }


  const user = await User.create(req.body)

  const token = signAccessToken(user._id)

  user.password = undefined

  res.status(201).json({
    status: 'success',
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

  if (!user || !( await user.confirmPassword(req.body.password, user.password ))) {
    return next(new AppError('Email or password is wrong', 401))
  }


  const refreshToken = signRefreshToken(user._id)

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 15 * 24 * 60 * 60 * 1000
  })

  const accessToken = signAccessToken(user._id)

  user.password = undefined

  res.status(200).json({
    status: 'success',
    token: accessToken,
    user
  })

})

exports.refresh = catchAsync( async(req, res, next) => {
  const token = req.cookies?.jwt

  if (!token) {
    return next(new AppError('Session expired. Please login again', 401))
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_REFRESH_SECRET)

  const currentUser = await User.findById(decoded.id)

  if (!currentUser) {
    return next(new AppError('No user found with that token', 401))
  }

  const accessToken = signAccessToken(currentUser._id)

  req.user = currentUser

    res.status(200).json({
      message: 'success',
      token: accessToken,
      user: currentUser
    })
})
