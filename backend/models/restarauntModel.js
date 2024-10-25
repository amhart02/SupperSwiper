// Import the DataTypes object from the sequelize package
const { DataTypes } = require('sequelize');

// Import the sequelize instance from the database configuration file
const { sequelize } = require('../config/database');

// Define the Restaurant model using sequelize.define
const Restaurant = sequelize.define('Restaurant', {
    // Define the id field with type INTEGER, primary key, and auto-increment
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // Define the restaurant field with type STRING and not allowing null values
    restaurant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // Define the url field with type STRING and not allowing null values
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    // Specify the table name in the database
    tableName: 'logo',
    // Disable automatic timestamps
    timestamps: false
});

// Export the Restaurant model for use in other parts of the application
module.exports = Restaurant;