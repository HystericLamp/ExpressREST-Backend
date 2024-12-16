const express = require('express');
const router = express.Router();
const ClinicianService = require('../services/clinicianService');

// Get all Clinicians
router.get('/', (request, response) => {
    ClinicianService.getAllClinicians((err, rows) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to get Clinicians', error: err.message });
        }

        response.status(200).json({ clinicians: rows });
    });
});

// Get a specific Clinician
router.get('/:npi', (request, response) => {
    const { npi } = request.params
    ClinicianService.getClinician(npi, (err, row) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to get Clinician', error: err.message });
        }

        response.status(200).json({ clinician: row });
    });
});

// Create a new Clinician
router.post('/', (request, response) => {
    ClinicianService.createClinician(request.body, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to create Clinician', error: err.message });
        }

        response.status(201).json({ message: 'Clnician created', id: this.lastID });
    });
});

// Update a Clinician
router.patch('/:npi', (request, response) => {
    const { npi } = request.params;
    ClinicianService.updateClinician(npi, request.body, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to update Clinician', error: err.message });
        }
        
        response.status(200).json({ message: 'Clinician updated', changes: this.changes });
    });
});

// Delete a Clinician
router.delete('/:npi', (request, response) => {
    const { npi } = request.params;
    ClinicianService.deleteClinician(npi, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to delete Clinician', error: err.message });
        }

        response.status(200).json({ message: 'Clinician deleted', changes: this.changes });
    });
});

module.exports = router;
