const express = require('express');
const viewsController = require('./../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.viewOverview);

router.get('/tour', viewsController.getTour);

module.exports = router;
