const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const port = 3000

app.use(express.json());

// Routes
const patientRoutes = require('./routes/patients');
app.use('/rest/patients', patientRoutes);

const clinicianRoutes = require('./routes/clinicians');
app.use('/rest/clinicians', clinicianRoutes);

const appointmentRoutes = require('./routes/appointments');
app.use('/rest/appointments', appointmentRoutes);

app.listen(port, () => {
    console.log(`Server Listening on PORT: ${port}`)
})