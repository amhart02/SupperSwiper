const express = require('express');
const router = express.Router();

// Import individual route files
const restarauntRoutes = require('./restaurantRoutes');

// Use individual routes
router.use('/', restarauntRoutes);

module.exports = router;