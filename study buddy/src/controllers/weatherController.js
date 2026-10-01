const { getWeatherData } = require('../services/weather.service');

// @desc    Fetch weather metrics for a specified city
// @route   GET /api/weather/:city
// @access  Public
const getCityWeather = async (req, res) => {
  try {
    const { city } = req.params;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: 'City name parameter is required'
      });
    }

    const weatherData = await getWeatherData(city);

    return res.status(200).json({
      success: true,
      data: weatherData
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCityWeather
};
