// Connect to database
const db = require('../db-connect');

const AppointmentService = {
    // Fetch appointments with cherry-picked values
    getAllAppointments(callback) {
        const query = `
            SELECT a.appointment_id, p.firstname, p.lastname, 
                   a.appointment_date, a.appointment_time, a.status
            FROM appointments a
            JOIN patient p ON p.patient_id = a.appointed_patient`;
        
        db.all(query, [], callback);
    },

    // Create a new appointment
    createAppointment(jsonData, callback) {
        const query = `
            INSERT INTO appointments 
            (appointment_id, appointed_patient, scheduled_clinician, appointment_date, appointment_time, status) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        
        const params = [
            jsonData.appointment_id,
            jsonData.appointed_patient,
            jsonData.scheduled_clinician,
            jsonData.appointment_date,
            jsonData.appointment_time,
            jsonData.status,
        ];

        db.run(query, params, callback);
    },

    // Update an appointment
    updateAppointment(id, jsonData, callback) {
        const query = `
            UPDATE appointments 
            SET appointed_patient = ?,
                scheduled_clinician = ?,
                appointment_date = ?,
                appointment_time = ?,
                status = ?
            WHERE appointment_id = ?`;
        
        const params = [
            jsonData.appointed_patient,
            jsonData.scheduled_clinician,
            jsonData.appointment_date,
            jsonData.appointment_time,
            jsonData.status,
            id,
        ];

        db.run(query, params, callback);
    },

    // Delete an appointment
    deleteAppointment(id, callback) {
        const query = 'DELETE FROM appointments WHERE appointment_id = ?';
        db.run(query, id, callback);
    }
};

module.exports = AppointmentService;
