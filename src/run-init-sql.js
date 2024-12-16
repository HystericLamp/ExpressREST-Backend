const sqlite3 = require('sqlite3').verbose();

// Instantiate the FileSystem and create 'data' folder
const fileSystem = require('fs');
const dir = './src/data/';

if (!fileSystem.existsSync(dir)){
    fileSystem.mkdirSync(dir);
}

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database(dir+'tlthpDB.sqlite', (err) => {
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
