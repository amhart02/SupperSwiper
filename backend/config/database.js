<<<<<<< Updated upstream
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv'); // npm package that allows access to .env variables
=======
// Import the dotenv package to load environment variables from a .env file
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const { createClient } = require('@supabase/supabase-js');
>>>>>>> Stashed changes

dotenv.config();

<<<<<<< Updated upstream
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function connectDB() {
  /* Connects to Supabase. If it connects will send 
     back success message. Otherwise, it will send
     back an error.
  */ 
  try {
    const { error } = await supabase.auth.getSession();

    if (error) {
      console.error('Failed to connect to Supabase:', error);
      process.exit(1);
    } else {
      console.log('Connected to Supabase.');
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

module.exports = { connectDB };
=======
// Initialize a new Sequelize instance with the connection string from the environment variable
const sequelize = new Sequelize(process.env.SUPABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Function to create a new lobby
const createLobby = async () => {
  const { data, error } = await supabase
    .from('lobbies')
    .insert([{ created_at: new Date() }]) // Adjust fields as needed
    .select('id');

  if (error) {
    console.error('Error creating lobby:', error);
    return null;
  }
  return data[0].id; // Return the lobby ID
};

// Export the Sequelize instance, connectDb function, and createLobby function
module.exports = { sequelize, connectDb, createLobby };
>>>>>>> Stashed changes
