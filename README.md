# TLTHP - Part 1

### Setup
1. Install node and npm
2. In the project directory, open a command line and type "npm install"
3. Next, run command "npm dbinit" to initialize the database
4. To run the app type "npm run start"
5. Server is now live at http://localhost:8000/

### Schema
[Download Database Schema](https://github.com/HystericLamp/TLTHP-Part1/blob/main/TLTHP%20Database%20Schema.pdf)

### Endpoints
Patients
GET - /rest/patients
GET - /rest/patients/:id
POST - /rest/patients/
PUT - /rest/patients/:id
DELETE - /rest/patients/:id

Clinicians
GET - /rest/clinicians
GET - /rest/clinicians/:npi
POST - /rest/clinicians/
PUT - /rest/clinicians/:npi
DELETE - /rest/clinicians/:npi

Appointments
GET - /rest/appointments
POST - /rest/appointments/
PUT - /rest/appointments/:id
DELETE - /rest/appointments/:id