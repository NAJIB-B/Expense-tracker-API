const { validationResult } = require("express-validator");

const catchAsync = require("../utils/catchAsync");
const filterQuery = require("../utils/filter");
const Expense = require("../models/expenseModel");
const User = require("../models/expenseModel");
const AppError = require("../utils/appError");

exports.createExpense = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new AppError(errors, 400));
  }

  req.body.owner = req.body.owner || req.user._id;

  const expense = await User.create(req.body);

  res.status(201).json({
    message: "success",
    expense,
  });
});

exports.getAllExpense = catchAsync(async (req, res, next) => {
  const dateQuery = filterQuery(req, next);
  const { category, amount } = req.query;

  const userId = req.user._id;

  const query = { owner: userId};

  if (category) {
    query.category = category
  }

  if (amount) {
    query.amount = amount
  }

  if (dateQuery.date !== undefined) {
    query.date = dateQuery.date
  }

  const expenses = await Expense.find(query);

  return res.status(200).json({
    message: "success",
    result: expenses.length,
    expenses,
  });

});

exports.getExpense = catchAsync(async (req, res, next) => {
  const expenseId = req.params.id;

  const expense = await Expense.findById(expenseId);

  res.status(200).json({
    message: "success",
    expense,
  });
});

exports.updateExpense = catchAsync(async (req, res, next) => {
  const expenseId = req.params.id;

  const expense = await Expense.findByIdAndUpdate(expenseId, req.body, {
    new: true,
  });

  res.status(201).json({
    message: "success",
    expense,
  });
});

exports.deleteExpense = catchAsync(async (req, res, next) => {
  const expenseId = req.params.id;

  await Expense.findByIdAndDelete(expenseId);

  res.status(204).json({
    message: "success",
  });
});
