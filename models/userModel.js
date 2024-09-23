const mongoose = require('mongoose')
const bcyrpt = require('bcryptjs')


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, 'This email is already in use'],
    required: [true, 'A user must have an email']
  },
  name: {
    type: String,
    required: [true, 'A user must have a name']
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minLength: [8, 'Password should contain atleast 8 characters'],
    select: false
  }
}, {timestamps: true})

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  this.password = await bcyrpt.hash(this.password, 12)

  next()
})

userSchema.methods.confirmPassword = async function(candidatePassword, userPassword) {
  return await bcyrpt.compare(candidatePassword, userPassword)
}

const User = mongoose.model('User', userSchema)


module.exports = User
