const express = require('express');
const authController = require('./../controllers/authController');
const reviewsController = require('./../controllers/reviewsController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(reviewsController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewsController.setTourUserIds,
    reviewsController.createReview
  );

router
  .route('/:id')
  .patch(reviewsController.updateReview)
  .delete(reviewsController.deleteReview);

module.exports = router;
