const {body} = require('express-validator')
const express = require('express')

const {protect, authorize} = require("../controllers/authController")
const { createExpense, getAllExpense, getExpense, updateExpense, deleteExpense } = require("../controllers/expenseController")

const router = express.Router()

router.use(protect)

router.route("/").post(
  [
    body("title").notEmpty().withMessage('An expense must have a title'),
    body("amount").notEmpty().withMessage('An expense must have an amount'),
    body("category").notEmpty().withMessage('An expense must have a category'),
  ],
  createExpense
).get(getAllExpense)


router.route("/:id").get(authorize, getExpense).patch(authorize, updateExpense).delete(authorize, deleteExpense)


module.exports = router
