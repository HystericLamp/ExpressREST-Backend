const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors());
const port = 3000

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello World!')
})

// Routes
const patientRoutes = require('./routes/patients');
app.use('/rest/patients', patientRoutes);

app.get('/', (request, response) => {
    response.send('Hello World!!');
});

app.listen(port, () => {
    console.log(`Server Listening on PORT: ${port}`)
})