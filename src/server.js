// Create express app
const express = require('express')
const app = express()

// Allow CORS
const cors = require('cors');
app.use(cors());

// Server port
const port = 8000

// middleware to parse JSON
app.use(express.json());

// Root endpoint
app.get("/", (request, response, next) => {
    response.json({"message":"Ok"})
});

// Routes
const patientRoutes = require('./routes/patientRoutes');
app.use('/rest/patients', patientRoutes);

const clinicianRoutes = require('./routes/clinicianRoutes');
app.use('/rest/clinicians', clinicianRoutes);

const appointmentsRoutes = require('./routes/appointmentsRoutes');
app.use('/rest/appointments', appointmentsRoutes);

// Default response for any other request
app.use(function(request, response){
    response.status(404);
});

// Start server
app.listen(port, () => {
    console.log(`Server Listening on PORT: ${port}`)
})