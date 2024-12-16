var sqlite3 = require('sqlite3').verbose()

// Connect to SQLite database (or create it if it doesn't exist)
const db = new sqlite3.Database('./src/data/tlthpDB.sqlite', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Closing SQLite database connection.');
    db.close();
    process.exit();
});

module.exports = db