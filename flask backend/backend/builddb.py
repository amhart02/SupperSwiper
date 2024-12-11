import sqlite3
import csv

# Create a connection to the SQLite database
connection = sqlite3.connect('supperswiper.db')
cursor = connection.cursor()

# Step 1: Create the table 'logos' if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS logos (
    id INTEGER PRIMARY KEY,
    restaurant TEXT,
    url TEXT
)
''')

# Step 2: Open the CSV file and read its contents
with open('logo_rows.csv', mode='r', newline='', encoding='utf-8') as file:
    reader = csv.DictReader(file)  # This assumes the first row contains headers
    for row in reader:
        # Step 3: Insert data into the 'logos' table
        cursor.execute('''
        INSERT INTO logos (id, restaurant, url)
        VALUES (?, ?, ?)
        ''', (row['id'], row['restaurant'], row['url']))

# Commit the changes to the database
connection.commit()

# Query the data to check the insertion
cursor.execute('SELECT * FROM logos')
rows = cursor.fetchall()

# Print the results
for row in rows:
    print(row)

# Close the connection
connection.close()
