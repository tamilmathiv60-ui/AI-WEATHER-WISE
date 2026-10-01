const Location = require('../models/Location');

// @desc    Add a favorite location
// @route   POST /api/locations
// @access  Private (Guarded by JWT)
const saveLocation = async (req, res) => {
  try {
    const { city, country } = req.body;

    if (!city || !country) {
      return res.status(400).json({
        success: false,
        message: 'Please provide city and country'
      });
    }

    const location = await Location.create({
      user: req.user._id,
      city: city.trim(),
      country: country.trim()
    });

    return res.status(201).json({
      success: true,
      data: location
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get user's favorite locations
// @route   GET /api/locations
// @access  Private (Guarded by JWT)
const getLocations = async (req, res) => {
  try {
    const locations = await Location.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete a favorite location
// @route   DELETE /api/locations/:id
// @access  Private (Guarded by JWT)
const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return res.status(404).json({
        success: false,
        message: 'Location not found'
      });
    }

    // Ensure the location belongs to the logged in user
    if (location.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'User not authorized to delete this location'
      });
    }

    await location.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Location removed successfully'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  saveLocation,
  getLocations,
  deleteLocation
};
