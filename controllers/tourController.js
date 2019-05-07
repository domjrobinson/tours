const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // Build Query
    const qureyObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    excludedFields.forEach(el => delete qureyObj[el]);
    console.log(req.query, qureyObj);

    const tours = await Tour.find(qureyObj);

    // const query = await Tours.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // Execute Query
    const tours = await query;

    // Send Response
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(201).json({
      status: 'success',
      data: { tour }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.createTour = async (req, res) => {
  // console.log('req.body', req.body);
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const tour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ status: 'success', data: { tour: { tour } } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid data set' });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: 'Invalid data set' });
  }
};
