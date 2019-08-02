const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewsModel');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourID) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'Success',
    data: {
      results: reviews.length,
      reviews
    }
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // * Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.toursID;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview
    }
  });
});
