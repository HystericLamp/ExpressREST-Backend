const express = require('express');
const router = express.Router();

// Mock database
let patients = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

// Get all patients
router.get('/', (request, response) => {
    response.json(patients);
});
  
// Get a specific patient
router.get('/:id', (request, response) => {
const patient = patients.find(p => p.id === parseInt(request.params.id));
    if (patient) {
        response.json(patient);
    } else {
        response.status(404).json({ message: 'Patient not found' });
    }
});

// Create a new patient
router.post('/', (request, response) => {
    const newPatient = {
        id: patients.length + 1,
        name: request.body.name
    };
    patients.push(newPatient);
    response.status(201).json(newPatient);
});

// Update a patient
router.put('/:id', (request, response) => {
const patient = patients.find(p => p.id === parseInt(request.params.id));
    if (patient) {
        patient.name = request.body.name;
        response.json(patient);
    } else {
        response.status(404).json({ message: 'Patient not found' });
    }
});

// Delete a patient
router.delete('/:id', (request, response) => {
    patients = patients.filter(p => p.id !== parseInt(request.params.id));
    response.json({ message: 'Patient deleted' });
});

module.exports = router;