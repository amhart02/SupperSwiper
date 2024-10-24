const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv'); // npm package that allows access to .env variables

dotenv.config();

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

module.exports = { connectDB, supabase };