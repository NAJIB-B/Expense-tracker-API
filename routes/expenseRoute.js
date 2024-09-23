const {body} = require('express-validator')
const express = require('express')

const {protect} = require("../controllers/authController")

const router = express.Router()


router.route("/").post(
  [
    body("title").notEmpty().withMessage('An expense must have a title'),
    body("amount").notEmpty().withMessage('An expense must have an amount'),
    body("category").notEmpty().withMessage('An expense must have a category'),
  ],
  protect
)


module.exports = router
