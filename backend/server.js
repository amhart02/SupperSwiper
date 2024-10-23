const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/database');

const app = express();
const port = process.env.PORT || 8080;

connectDB();

app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});