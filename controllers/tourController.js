const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/ApiFeatures');
const catchAsync = require('./../utils/catchAsync');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAvg,price';
  req.query.fields = 'name,price,ratingsAvg,summary,difficulty';
  next();
};

exports.getAllTours = catchAsync(async (req, res) => {
  try {
    console.log(req.query);

    // Execute Query
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
});

exports.getTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const tour = await Tour.findById(id);
  res.status(201).json({
    status: 'success',
    data: { tour }
  });
});

exports.createTour = catchAsync(async (req, res) => {
  // console.log('req.body', req.body);

  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { tour: newTour }
  });

  res.status(400).json({ status: 'fail', message: err });
});

exports.updateTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const tour = await Tour.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true
  });
  res.status(200).json({ status: 'success', data: { tour: { tour } } });
});

exports.deleteTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Tour.findByIdAndDelete(id);

  res.status(204).json({ status: 'success', data: null });
});

exports.getTourStats = catchAsync(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAvg: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        num: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAvg' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    }
    // {
    //   $match: { _id: { $ne: 'EASY' } }
    // }
  ]);

  res.status(201).json({
    status: 'success',
    data: { stats }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $addFields: { month: '$_id' }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numTourStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);
  res.status(201).json({
    status: 'success',
    data: { plan }
  });
});
