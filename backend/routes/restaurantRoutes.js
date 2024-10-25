const express = require('express');
const router = express.Router();
const { getAllRestaurants, getRestaurantById } = require('../controllers/restaurantController');

/**
 * @swagger
 * /logos:
 *   get:
 *     summary: Retrieve a list of restaurants with their logos
 *     responses:
 *       200:
 *         description: A list of restaurants with their logos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The restaurant ID
 *                   restaurant:
 *                     type: string
 *                     description: The name of the restaurant
 *                   url:
 *                     type: string
 *                     description: The URL of the restaurant logo
 */
// Route to get all restaurant data
router.get('/logos', getAllRestaurants);

/**
 * @swagger
 * /logos/{id}:
 *   get:
 *     summary: Retrieve a specific restaurant logo by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The restaurant ID
 *     responses:
 *       200:
 *         description: A specific restaurant data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The restaurant ID
 *                 restaurant:
 *                   type: string
 *                   description: The name of the restaurant
 *                 url:
 *                   type: string
 *                   description: The URL of the restaurant logo
 */
// Route to get restaurant data for single restaurant by ID
router.get('/logos/:id', getRestaurantById);

module.exports = router;