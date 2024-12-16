const express = require('express');
const router = express.Router();

// Connect to database
var db = require("../db-connect.js")

// Get all patients
router.get('/', (request, response) => {
    var query = "select * from patient"

    db.all(query, [], (err, rows) => {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json({ patients: rows });
        }
    });
});

// Get a specific patient
router.get('/:id', (request, response) => {
    var query = "select * from patient where patient_id = ?"
    var params = [request.params.id]
    
    db.get(query, params, (err, row) => {
        if (err) {
            response.status(400).json({"error":err.message});
          return;
        }

        response.json({"data":row})
    });
});

// Create a new patient
router.post('/', (request, response) => {
    var { firstname, lastname, birth_date, address, email, phone } = request.body;
    var query = `INSERT INTO patient (firstname, lastname, birth_date, address, email, phone) VALUES (?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [firstname, lastname, birth_date, address, email, phone], function(err) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json({ id: this.lastID });
        }
    });
});

// Update a patient
router.put('/:id', (request, response) => {
    var { id } = request.params;
    var { firstname, lastname, birth_date, address, email, phone } = request.body;
    var query = `UPDATE patient SET patient_id = ?,
                                    firstname = ?, 
                                    lastname = ?, 
                                    birth_date = ?, 
                                    address = ?, 
                                    email = ?, 
                                    phone = ? 
                                    WHERE patient_id = ?`;
    
    db.run(query, [id, firstname, lastname, birth_date, address, email, phone, id], function(err) {
        if (err) {
          return response.status(500).send({ message: 'Failed to update patient', error: err.message });
        }
        response.status(200).send({ message: 'patient updated', changes: this.changes });
    });
});

// Delete a patient
router.delete('/:id', (request, response) => {
    var { id } = request.params;
    var query = 'DELETE FROM patient WHERE patient_id = ?'
    
    db.run(query, [id], function(err) {
        if (err) {
            return response.status(500).send({ message: 'Failed to delete patient', error: err.message });
        }
        response.status(200).send({ message: 'Patient has been deleted', changes: this.changes });
    });
});

module.exports = router;