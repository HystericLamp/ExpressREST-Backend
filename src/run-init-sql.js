const sqlite3 = require('sqlite3').verbose();
const fileSystem = require('fs');

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('./src/data/tlthpDB.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Read and execute the SQL script
const initScript = fileSystem.readFileSync('./src/init.sql', 'utf8');
db.exec(initScript, (err) => {
    if (err) {
        console.error('Error executing SQL script:', err.message);
    } else {
        console.log('Database initialized successfully.');
    }

    // Close the database connection
    db.close((closeErr) => {
        if (closeErr) {
            console.error('Error closing the database:', closeErr.message);
        } else {
            console.log('Database connection closed.');
        }
    });
});
