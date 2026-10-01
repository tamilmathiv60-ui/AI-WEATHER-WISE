const { generateWeatherInsights } = require('../services/ai.service');

// @desc    Generate AI weather recommendations and activity advice
// @route   POST /api/ai/recommendation (also aliased as /api/ai/insights)
// @access  Public / Protected
const getWeatherRecommendation = async (req, res) => {
  try {
    const { city, temperature, humidity, condition } = req.body;

    if (!city || temperature === undefined || humidity === undefined || !condition) {
      return res.status(400).json({
        success: false,
        message: 'Please provide city, temperature, humidity, and condition in request body'
      });
    }

    const recommendation = await generateWeatherInsights({
      city,
      temperature,
      humidity,
      condition
    });

    return res.status(200).json({
      success: true,
      recommendation
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getWeatherRecommendation
};
