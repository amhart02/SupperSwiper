import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ufspoqsiekltviqvfjlo.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Use fetch to pull data from the API
fetch(supabase)
    .then(response => {
        // Check if the response status is OK (status code 200)
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        // Convert the response into JSON format
        return response.json();
    })
    .then(data => {
        // Log the data to the console
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('There was a problem with the fetch operation:', error);
    });