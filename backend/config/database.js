// Import the dotenv package to load environment variables from a .env file
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

// Import the Sequelize constructor from the sequelize package
const { Sequelize } = require('sequelize');

// Initialize a new Sequelize instance with the connection string from the environment variable
const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres', // Specify the dialect as PostgreSQL
  dialectOptions: {
    ssl: {
      require: true, // Require SSL connection
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

// Define an asynchronous function to authenticate the database connection
const connectDb = async () => {
  try {
    // Attempt to authenticate the connection
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    // Log any errors that occur during authentication
    console.error('Unable to connect to the database:', error);
  }
};

// Export the Sequelize instance and the connectDb function
module.exports = { sequelize, connectDb };