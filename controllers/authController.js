const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');

const signToken = id =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: { user: newUser }
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) if email && password Exquisite
  if (!email || !password) {
    return next(new AppError('Please provide email & password', 400));
  }
  // 2) check if user Exist && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) send token
  const token = signToken(user._id);

  res.status(200).json({ status: 'success', token });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Get Token, and chek if it Exist
  let token;
  if (
    req.headers.autherorization &&
    req.headers.autherorization.startsWith('Bearer')
  ) {
    token = req.headers.autherorization.split(' ')[0];
  }

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }
  // 2) Verify Token
  // 3) Check if user Exist
  // 4) check if user changed password after token was issued

  next();
});
