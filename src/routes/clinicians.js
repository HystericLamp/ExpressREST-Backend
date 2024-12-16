const express = require('express');
const router = express.Router();

// Connect to database
var db = require("../db-connect.js")

// Get all clinicians
router.get('/', (request, response) => {
    var query = "select * from clinician"
    db.all(query, [], (err, rows) => {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json({ clinicians: rows });
        }
    });
});
  
// Get a specific clinician
router.get('/:npi', (request, response) => {
    var query = "select * from clinician where npi = ?"
    var params = [request.params.npi]
    db.get(query, params, (err, row) => {
        if (err) {
            response.status(400).json({"error":err.message});
          return;
        }

        response.json({"data":row})
    });
});

// Create a new clinician
router.post('/', (request, response) => {
    var { npi, firstname, lastname, organization, address, city, state, postal_code } = request.body;
    var query = `INSERT INTO clinician (npi, firstname, lastname, organization, address, city, state, postal_code) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    db.run(query, [npi, firstname, lastname, organization, address, city, state, postal_code], function(err) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json({ npi: this.lastID });
        }
    });
});

// Update a clinician
router.patch('/:npi', (request, response) => {
    var { npi } = request.params;
    var { firstname, lastname, organization, address, city, state, postal_code } = request.body;
    var query = `UPDATE clinician SET firstname = ?, 
                                      lastname = ?, 
                                      organization = ?, 
                                      address = ?, 
                                      city = ?, 
                                      state = ?,
                                      postal_code = ?
                                      WHERE npi = ?`;
    
    db.run(query, [firstname, lastname, organization, address, city, state, postal_code, npi], function(err) {
        if (err) {
          return response.status(500).send({ message: 'Failed to update clinician', error: err.message });
        }
        response.status(200).send({ message: 'clinician updated', changes: this.changes });
    });
});

// Delete a clinician
router.delete('/:npi', (request, response) => {
    var { npi } = request.params;
    var query = 'DELETE FROM clinician WHERE npi = ?'
    db.run(query, [npi], function(err) {
        if (err) {
            return response.status(500).send({ message: 'Failed to delete clinician', error: err.message });
        }
        response.status(200).send({ message: 'Clinician has been deleted', changes: this.changes });
    });
});

module.exports = router;