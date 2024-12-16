// Connect to database
const db = require('../db-connect');

const ClinicianService = {
    // Get all Clinicians
    getAllClinicians(callback) {
        var query = `SELECT * FROM clinician`;
        
        db.all(query, [], callback);
    },

    // Get a specific Clinician
    getClinician(npi, callback) {
        var query = "SELECT * FROM clinician WHERE npi = ?"
        db.get(query, npi, callback);
    },

    // Create a new Clinician
    createClinician(jsonData, callback) {
        var query = `
                INSERT INTO clinician (firstname, lastname, organization, address, state, postal_code) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        var params = [
            jsonData.firstname,
            jsonData.lastname,
            jsonData.organization,
            jsonData.address,
            jsonData.city,
            jsonData.state,
            jsonData.postal_code
        ];

        db.run(query, params, callback);
    },

    // Update a Clinician
    updateClinician(npi, jsonData, callback) {
        var query = `
            UPDATE clinician 
            SET firstname = ?, 
                lastname = ?, 
                organization = ?, 
                address = ?, 
                city = ?, 
                state = ?,
                postal_code = ?
            WHERE npi = ?`;
        
        var params = [
            jsonData.firstname,
            jsonData.lastname,
            jsonData.birth_date,
            jsonData.address,
            jsonData.email,
            jsonData.phone,
            npi
        ];

        db.run(query, params, callback);
    },

    // Delete a Clinician
    deleteClinician(npi, callback) {
        var query = 'DELETE FROM clinician WHERE npi = ?';
        db.run(query, npi, callback);
    }
};

module.exports = ClinicianService;
