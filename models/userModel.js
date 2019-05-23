const mongoose = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'Password must be 8 or more charcters']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      message: 'Passwords do not match',
      validator: function(el) {
        return el === this.password;
      }
    }
  }
});

user.pre('save', function(next) {
  if (!this.isModified('password')) return next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
