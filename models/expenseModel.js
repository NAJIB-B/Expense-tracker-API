const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "An expense must have a title"],
  },
  amount: {
    type: Number,
    required: [true, "An expense must have an amount"],
    min: 0,
  },
  date: {
    type: Date,
    default: Date.now,
    index: -1
  },
  category: {
    type: String,
    enum: [
      "Groceries",
      "Leisure",
      "Electronics",
      "Utilities",
      "Clothing",
      "Health",
      "Others",
    ],
    index: 1,
    required: [true, 'An expense must have a category']
  },
  description: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An expense must have an owner'],
    index: 1
  }
});


const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense
