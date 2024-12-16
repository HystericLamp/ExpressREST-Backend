// Connect to database
const db = require('../db-connect');

const PatientService = {
    // Get all Patients
    getAllPatients(callback) {
        var query = `SELECT * FROM patient`;
        
        db.all(query, [], callback);
    },

    // Get a specific Patient
    getPatient(id, callback) {
        var query = "SELECT * FROM patient WHERE patient_id = ?"
        db.get(query, id, callback);
    },

    // Create a new Patient
    createPatient(jsonData, callback) {
        var query = `
                INSERT INTO patient (firstname, lastname, birth_date, address, email, phone) 
                VALUES (?, ?, ?, ?, ?, ?)`;
        
        var params = [
            jsonData.firstname,
            jsonData.lastname,
            jsonData.birth_date,
            jsonData.address,
            jsonData.email,
            jsonData.phone,
        ];

        db.run(query, params, callback);
    },

    // Update a Patient
    updatePatient(id, jsonData, callback) {
        var query = `
            UPDATE patient 
            SET patient_id = ?,
                firstname = ?, 
                lastname = ?, 
                birth_date = ?, 
                address = ?, 
                email = ?, 
                phone = ? 
            WHERE patient_id = ?`;
        
        var params = [
            id,
            jsonData.firstname,
            jsonData.lastname,
            jsonData.birth_date,
            jsonData.address,
            jsonData.email,
            jsonData.phone,
            id
        ];

        db.run(query, params, callback);
    },

    // Delete a Patient
    deletePatient(id, callback) {
        var query = 'DELETE FROM patient WHERE patient_id = ?';
        db.run(query, id, callback);
    }
};

module.exports = PatientService;
