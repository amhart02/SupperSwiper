from flask import Flask, request, jsonify
import sqlite3
import re
import random

# Initialize Flask app
app = Flask(__name__)



# Database connection function
def get_db_connection():
    conn = sqlite3.connect('supperswiper.db')  # Path to SQLite database
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name (instead of index)
    return conn





# Route to fetch all logos (GET request)
@app.route('/logos', methods=['GET'])
def get_logos():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Execute the SQL query to fetch all logos
    cursor.execute('SELECT * FROM logos')
    rows = cursor.fetchall()
    
    # Convert the rows to a list of dictionaries
    logos = []
    for row in rows:
        logos.append({
            'id': row['id'],
            'restaurant': row['restaurant'],
            'url': row['url']
        })
    
    conn.close()  # Close the database connection
    
    # Return the data in JSON format
    return jsonify(logos)






# Function to generate a random 4-digit code
def generate_unique_table_code():
    while True:
        # Generate a random 4-digit code (between 1000 and 9999)
        table_code = str(random.randint(1000, 9999))

        # Check if the table with this code already exists
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('''
        SELECT name FROM sqlite_master WHERE type="table" AND name=?
        ''', (f'table_{table_code}',))
        table_exists = cursor.fetchone()

        conn.close()

        # If the table does not exist, return the code
        if not table_exists:
            return table_code

# Route to create a new table with a unique 4-digit code
@app.route('/create_table', methods=['GET'])
def create_table():
    # Generate a unique 4-digit code for the table
    table_code = generate_unique_table_code()

    # Create the SQL to create the new table
    table_name = f'table_{table_code}'  # Naming convention: table_XXXX
    create_table_sql = f'''
    CREATE TABLE IF NOT EXISTS {table_name} (
        user TEXT NOT NULL,
        restID INTEGER,
        FOREIGN KEY (restID) REFERENCES logos (id)
    );
    '''

    # Execute the SQL to create the table
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(create_table_sql)
        conn.commit()
        conn.close()
        return jsonify({'message': f'Table {table_name} created successfully.', 'table_code': table_code}), 201
    except Exception as e:
        return jsonify({'error': f'Error creating table: {str(e)}'}), 500







# Route to insert a new record into the user table
@app.route('/add_user', methods=['POST'])
def update_lobby():
    # Get the inputs from the request body
    username = request.json.get('username')
    restID = request.json.get('restID')  # restID can be None (null)
    table_code = request.json.get('table_code')

    # Validate the inputs
    if not username or not table_code:
        return jsonify({'error': 'Both username and table_code are required.'}), 400

    # Validate restID (it should be an integer or None)
    if restID is not None and not isinstance(restID, int):
        return jsonify({'error': 'restID must be an integer or null.'}), 400

    # Validate the table code (ensure it's a 4-digit number)
    if not re.match(r'^\d{4}$', table_code):
        return jsonify({'error': 'Invalid table code. It must be a 4-digit number.'}), 400

    # Check if the table exists
    table_name = f'table_{table_code}'  # Dynamic table name
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
    SELECT name FROM sqlite_master WHERE type="table" AND name=?
    ''', (table_name,))
    table_exists = cursor.fetchone()

    if not table_exists:
        conn.close()
        return jsonify({'error': f'Table {table_name} does not exist.'}), 404

    # Insert the data into the table
    try:
        cursor.execute(f'''
        INSERT INTO {table_name} (user, restID)
        VALUES (?, ?)
        ''', (username, restID))

        conn.commit()
        conn.close()

        return jsonify({'message': f'User {username} added to table {table_name}.'}), 201

    except Exception as e:
        conn.close()
        return jsonify({'error': f'Error inserting data: {str(e)}'}), 500




# Route to get users with NULL restID
@app.route('/get_users', methods=['POST'])
def get_users():
    # Get the table code from the request body
    table_code = request.json.get('table_code')

    # Validate the table code (ensure it's a 4-digit number)
    if not table_code or not re.match(r'^\d{4}$', table_code):
        return jsonify({'error': 'Invalid table code. It must be a 4-digit number.'}), 400

    # Construct the table name dynamically
    table_name = f'table_{table_code}'

    # Check if the table exists
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
    SELECT name FROM sqlite_master WHERE type="table" AND name=?
    ''', (table_name,))
    table_exists = cursor.fetchone()

    if not table_exists:
        conn.close()
        return jsonify({'error': f'Table {table_name} does not exist.'}), 404

    # Query the table for users where restID is NULL
    try:
        cursor.execute(f'''
        SELECT user FROM {table_name} WHERE restID IS NULL;
        ''')
        users = cursor.fetchall()

        # If users are found, return them
        if users:
            user_list = [user['user'] for user in users]
            conn.close()
            return jsonify({'users': user_list}), 200
        else:
            conn.close()
            return jsonify({'message': 'No users found with NULL restID.'}), 404
    except Exception as e:
        conn.close()
        return jsonify({'error': f'Error retrieving data: {str(e)}'}), 500





# Route to check if there is a match in the table based on restID
@app.route('/check_match', methods=['POST'])
def check_match():
    # Get the table code from the request body
    table_code = request.json.get('table_code')

    # Validate the table code (ensure it's a 4-digit number)
    if not table_code or not re.match(r'^\d{4}$', table_code):
        return jsonify({'error': 'Invalid table code. It must be a 4-digit number.'}), 400

    # Construct the table name dynamically
    table_name = f'table_{table_code}'  # Naming convention: table_XXXX

    # Check if the table exists
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
    SELECT name FROM sqlite_master WHERE type="table" AND name=?
    ''', (table_name,))
    table_exists = cursor.fetchone()

    if not table_exists:
        conn.close()
        return jsonify({'error': f'Table {table_name} does not exist.'}), 404

    # Query to find if there's a repeated restID with different users
    cursor.execute(f'''
    SELECT restID
    FROM {table_name}
    WHERE restID IS NOT NULL
    GROUP BY restID
    HAVING COUNT(DISTINCT user) > 1;
    ''')

    # Fetch the result
    match = cursor.fetchone()

    # If a match is found, return the restID and match_found: True
    if match:
        restID = match['restID']
        conn.close()
        return jsonify({'restID': restID, 'match_found': True}), 200
    else:
        conn.close()
        return jsonify({'match_found': False}), 200





# Route to fetch the match based on restID
@app.route('/fetch_match', methods=['POST'])
def fetch_match():
    # Get the restID from the request body
    restID = request.json.get('restID')

    # Validate the restID (it should be an integer)
    if not restID or not isinstance(restID, int):
        return jsonify({'error': 'Invalid restID. It must be an integer.'}), 400

    # Connect to the database
    conn = get_db_connection()
    cursor = conn.cursor()

    # Query to check if the restID exists in the logos table
    cursor.execute('SELECT restaurant, url FROM logos WHERE id = ?', (restID,))
    logo = cursor.fetchone()

    # If the restID is not found in the logos table
    if not logo:
        conn.close()
        return jsonify({'error': f'Restaurant with ID {restID} not found.'}), 404

    # Return the restaurant name and URL for the restID
    restaurant = logo['restaurant']
    url = logo['url']

    conn.close()
    return jsonify({'restaurant': restaurant, 'url': url}), 200




if __name__ == '__main__':
    # Run the app in development mode
    app.run(debug=True)
