const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');

exports.viewOverview = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forrest Hiker Tour'
  });
};
