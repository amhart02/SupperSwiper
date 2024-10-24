const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');
const restaurantRoutes = require('./routes/restaurantRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(bodyParser.json());
app.use('/', restaurantRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});