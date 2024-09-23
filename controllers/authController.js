const {promisify} = require("util")
const jwt = require('jsonwebtoken')

const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/appError")
const User = require("../models/userModel")


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


//exports.authorize = catchAsync( async(req, res, next) => {
//  
//  const id = req.params.id
//
//  const userId = req.user._id
//
//
//
//  res.status(200).json({
//    messsage: 'success'
//  })
//})
//
