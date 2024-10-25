// Import the express package
const express = require('express');

// Import the body-parser package to parse incoming request bodies
const bodyParser = require('body-parser');

// Import the connectDb function from the database config file
const { connectDb } = require('./config/database');

// Import the index route
const routes = require('./routes')

// Import swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');

// Create an express application
const app = express();

// Define the port that the server will run on
const port = process.env.PORT || 8080;

// Connect to the database
connectDb();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use the restaurant routes for handling requests
app.use('/', routes)

// Swagger documentation at the /api-docs endpoint
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});