const express = require('express');
const router = express.Router();
const AppointmentService = require('../services/appointmentsService');

// Get all appointments
router.get('/', (request, response) => {
    AppointmentService.getAllAppointments((err, rows) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to get appointments', error: err.message });
        }

        response.status(200).json({ appointments: rows });
    });
});

// Create a new appointment
router.post('/', (request, response) => {
    AppointmentService.createAppointment(request.body, function (err) {
        if (err) {
            return response.status(500).json({ message: 'Failed to create appointment', error: err.message });
        }

        response.status(201).json({ message: 'Appointment created', id: this.lastID });
    });
});

// Update an appointment
router.put('/:id', (request, response) => {
    const { id } = request.params;
    AppointmentService.updateAppointment(id, request.body, (err) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to update appointment', error: err.message });
        }
        
        response.status(200).json({ message: 'Appointment updated', changes: this.changes });
    });
});

// Delete an appointment
router.delete('/:id', (request, response) => {
    const { id } = request.params;
    AppointmentService.deleteAppointment(id, (err) => {
        if (err) {
            return response.status(500).json({ message: 'Failed to delete appointment', error: err.message });
        }

        response.status(200).json({ message: 'Appointment deleted', changes: this.changes });
    });
});

module.exports = router;
