// Import the restaurant model from models directory
const Restaurant = require('../models/restarauntModel')

const getAllRestaurants = async (req, res) => {
    /* Gets All Restaurants from Database.
       Data: ID, Name, and Logo 
       Parameters: Request, Response */
  try {
    // Fetch all restaurants from the database
    const restaurants = await Restaurant.findAll();
    // Send the fetched data as a JSON response
    res.json(restaurants);
  } catch (err) {
    // Log any errors that occur and send a 500 status response with message
    console.error('Error occurred while grabbing data:', err);
    res.status(500).json({ message: "Error occurred while grabbing data." });
  }
};

const getRestaurantById = async (req, res) => {
    /* Gets a single Restaurant by ID
       Data: ID, Name, and Logo. 
       Parameters: Request, Response */

  // Extract the ID parameter from the request
  const { id } = req.params;

  try {
    // Fetch the restaurant with the specified ID from the database
    const restaurant = await Restaurant.findByPk(id);
    if (restaurant) {
        // If restaurant is found, send it as a JSON response
        res.json(restaurant);
    } else {
        // If the restaurant is not found, send a 404 status with message
        res.status(404).json({ message: "Restaurant not found." });
    }
  } catch (err) {
    // Log any errors that occur and send a 500 status with message
    console.error('Error occurred while grabbing the data:', err);
    res.status(500).json({ message: "Error occurred while grabbing the data." });
  }
};

// Export the controller functions for use in other parts
module.exports = { getAllRestaurants, getRestaurantById };