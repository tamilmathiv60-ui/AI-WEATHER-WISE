const express = require('express');
const router = express.Router();
const {
  saveLocation,
  getLocations,
  deleteLocation
} = require('../controllers/locationController');
const { protect } = require('../middleware/authMiddleware');

// All location routes are protected by JWT Bearer token
router.use(protect);

// @route   POST /api/locations & GET /api/locations
router.route('/')
  .post(saveLocation)
  .get(getLocations);

// @route   DELETE /api/locations/:id
router.route('/:id')
  .delete(deleteLocation);

module.exports = router;
