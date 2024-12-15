const express = require('express');
const router = express.Router();

// Mock database
let appointments = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

// Get all appointments
router.get('/', (request, response) => {
    response.json(appointments);
});
  
// Get a specific appointment
router.get('/:id', (request, response) => {
const appointment = appointments.find(a => a.id === parseInt(request.params.id));
    if (appointment) {
        response.json(appointment);
    } else {
        response.status(404).json({ message: 'Appointment not found' });
    }
});

// Create a new appointment
router.post('/', (request, response) => {
    const newAppointment = {
        id: appointment.length + 1,
        name: request.body.name
    };
    appointments.push(newAppointment);
    response.status(201).json(newAppointment);
});

// Update a appointment
router.put('/:id', (request, response) => {
const appointment = appointments.find(a => a.id === parseInt(request.params.id));
    if (appointment) {
        appointment.name = request.body.name;
        response.json(appointment);
    } else {
        response.status(404).json({ message: 'Appointment not found' });
    }
});

// Delete a clinician
router.delete('/:id', (request, response) => {
    appointments = appointments.filter(a => a.id !== parseInt(request.params.id));
    response.json({ message: 'Appointment deleted' });
});

module.exports = router;