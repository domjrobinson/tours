// const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewsModel');
const factory = require('./handlerFactory');

exports.setTourUserIds = (req, res, next) => {
  // * Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.toursID;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
exports.createReview = factory.createOne(Review);
exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
