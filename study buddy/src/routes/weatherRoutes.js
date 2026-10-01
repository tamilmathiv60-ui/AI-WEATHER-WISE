const express = require('express');
const router = express.Router();
const { getCityWeather } = require('../controllers/weatherController');

// @route   GET /api/weather/:city
router.get('/:city', getCityWeather);

module.exports = router;
