const express = require('express');
const router = express.Router();
const PatientService = require('../services/patientService');

// Get all Patients
router.get('/', (request, response) => {
    PatientService.getAllPatients((err, rows) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to get patients', error: err.message });
        }

        response.status(200).json({ patients: rows });
    });
});

// Get a specific Patient
router.get('/:id', (request, response) => {
    const { id } = request.params;
    PatientService.getPatient(id, (err, row) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to get patient', error: err.message });
        }

        response.status(200).json({ patient: row });
    });
});

// Create a new Patient
router.post('/', (request, response) => {
    PatientService.createPatient(request.body, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to create Patient', error: err.message });
        }

        response.status(201).json({ message: 'Patient created', id: this.lastID });
    });
});

// Update a Patient
router.put('/:id', (request, response) => {
    const { id } = request.params;
    PatientService.updatePatient(id, request.body, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to update Patient', error: err.message });
        }
        
        response.status(200).json({ message: 'Patient updated', changes: this.changes });
    });
});

// Delete a Patient
router.delete('/:id', (request, response) => {
    const { id } = request.params;
    PatientService.deletePatient(id, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to delete Patient', error: err.message });
        }

        response.status(200).json({ message: 'Patient deleted', changes: this.changes });
    });
});

module.exports = router;
