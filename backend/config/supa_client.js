import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufspoqsiekltviqvfjlo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmc3BvcXNpZWtsdHZpcXZmamxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg5MzgyNjQsImV4cCI6MjA0NDUxNDI2NH0.27iQfTEVBJfi5O9x_7AsPYUNOPZH1sRklzeCUqhgak4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
