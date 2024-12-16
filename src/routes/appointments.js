const express = require('express');
const router = express.Router();

// Connect to database
var db = require("../db-connect.js")

// Get all appointments for list display
router.get('/', (request, response) => {
    var query = `SELECT a.appointment_id, p.firstname, p.lastname, a.appointment_date, a.appointment_time, a.status
                 FROM appointments a
                 JOIN patient p ON p.patient_id = a.appointed_patient`
    db.all(query, [], (err, rows) => {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json({ appointments: rows });
        }
    });
});

// Create a new appointment
router.post('/', (request, response) => {
    var { appointment_id, appointed_patient, scheduled_clinician, appointment_date, appointment_time, status } = request.body;
    var query = `INSERT INTO appointments (appointment_id, appointed_patient, scheduled_clinician, appointment_date, appointment_time, status) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [appointment_id, appointed_patient, scheduled_clinician, appointment_date, appointment_time, status], function(err) {
        if (err) {
            response.status(500).json({ error: err.message });
        } else {
            response.json({ id: this.lastID });
        }
    });
});

// Update an appointment
router.put('/:id', (request, response) => {
    var { id } = request.params;
    var { appointed_patient, scheduled_clinician, appointment_date, appointment_time, status } = request.body;
    var query = `UPDATE appointments SET appointment_id = ?,
                                         appointed_patient = ?, 
                                         scheduled_clinician = ?, 
                                         appointment_date = ?, 
                                         appointment_time = ?, 
                                         status = ?
                                         WHERE appointment_id = ?`;
    
    db.run(query, [id, appointment_id, appointed_patient, scheduled_clinician, appointment_date, appointment_time, status, id], function(err) {
        if (err) {
          return response.status(500).send({ message: 'Failed to update appointment', error: err.message });
        }
        response.status(200).send({ message: 'appointment updated', changes: this.changes });
    });
});

// Delete an appointment
router.delete('/:id', (request, response) => {
    var { id } = request.params;
    var query = 'DELETE FROM appointments WHERE appointment_id = ?'
    db.run(query, [id], function(err) {
        if (err) {
            return response.status(500).send({ message: 'Failed to delete appointment', error: err.message });
        }
        response.status(200).send({ message: 'appointment has been deleted', changes: this.changes });
    });
});

module.exports = router;