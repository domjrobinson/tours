const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
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
    res.status(400).json({ status: 'fail', message: 'Invalid data set' });
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

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
