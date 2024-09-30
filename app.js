const express = require('express')
const cookierParser = require('cookie-parser')

const userRouter = require('./routes/userRoute')
const expenseRouter = require('./routes/expenseRoute')


const app = express()

app.use(express.json())
app.use(cookierParser())


app.use('/api/v1/user', userRouter)
app.use('/api/v1/expense', expenseRouter)

app.use((error, req, res, next)=> {
  console.log(error)
  res.status(error.statusCode).json({
    error: error.message,
    stack: error.stack
  })
})


module.exports = app
