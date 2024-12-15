const express = require('express');
const router = express.Router();

// Mock database
let clinicians = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

// Get all clinicians
router.get('/', (request, response) => {
    response.json(clinicians);
});
  
// Get a specific clinician
router.get('/:id', (request, response) => {
const clinician = clinicians.find(c => c.id === parseInt(request.params.id));
    if (clinician) {
        response.json(clinician);
    } else {
        response.status(404).json({ message: 'Clinician not found' });
    }
});

// Create a new clinician
router.post('/', (request, response) => {
    const newClinician = {
        id: clinician.length + 1,
        name: request.body.name
    };
    clinicians.push(newClinician);
    response.status(201).json(newClinician);
});

// Update a clinician
router.put('/:id', (request, response) => {
const clinician = clinicians.find(c => c.id === parseInt(request.params.id));
    if (clinician) {
        clinician.name = request.body.name;
        response.json(clinician);
    } else {
        response.status(404).json({ message: 'Clinician not found' });
    }
});

// Delete a clinician
router.delete('/:id', (request, response) => {
    clinicians = clinicians.filter(c => c.id !== parseInt(request.params.id));
    response.json({ message: 'Clinician deleted' });
});

module.exports = router;