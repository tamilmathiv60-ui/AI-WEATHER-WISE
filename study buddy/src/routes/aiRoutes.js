const express = require('express');
const router = express.Router();
const { getWeatherRecommendation } = require('../controllers/aiController');

// Support both endpoint paths used in documentation: /recommendation and /insights
router.post('/recommendation', getWeatherRecommendation);
router.post('/insights', getWeatherRecommendation);

module.exports = router;
