# TLTHP - Part 1

### Setup
1. Install node and npm
2. In the project directory, open a command line and type "npm install"
3. Next, run command "npm run dbinit" to initialize the database
4. To run the app, type "npm run start"
5. Server is now live at http://localhost:8000/
6. To test REST endpoints, Postman was used

### Schema
[Download Database Schema](https://github.com/HystericLamp/TLTHP-Part1/blob/main/TLTHP%20Database%20Schema.pdf)

### Endpoints
Patients <br/>
GET - /rest/patients <br/>
GET - /rest/patients/:id <br/>
POST - /rest/patients/ <br/>
PUT - /rest/patients/:id <br/>
DELETE - /rest/patients/:id <br/>

Clinicians <br/>
GET - /rest/clinicians <br/>
GET - /rest/clinicians/:npi <br/>
POST - /rest/clinicians/ <br/>
PUT - /rest/clinicians/:npi <br/>
DELETE - /rest/clinicians/:npi <br/>

Appointments
GET - /rest/appointments <br/>
POST - /rest/appointments/ <br/>
PUT - /rest/appointments/:id <br/>
DELETE - /rest/appointments/:id <br/>
