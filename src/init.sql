-- Create a patients table
CREATE TABLE IF NOT EXISTS patient (
    patient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    birth_date DATE NOT NULL,
    address TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT NOT NULL
);

-- Create a clinicians table
CREATE TABLE IF NOT EXISTS clinician (
    npi INTEGER PRIMARY KEY,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    organization TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    postal_code TEXT NOT NULL
);

-- Create an appointments table
CREATE TABLE IF NOT EXISTS appointments (
    appointment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointed_patient INTEGER,
    scheduled_clinician INTEGER,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status VARCHAR NOT NULL,
    FOREIGN KEY (appointed_patient) REFERENCES patient(patient_id),
    FOREIGN KEY (scheduled_clinician) REFERENCES clinician(npi)
);

-- Insert data into the patient table
INSERT INTO patient (firstname, lastname, birth_date, address, email, phone) VALUES
('John', 'Doe', '1985-06-15', '123 Maple St, Cityville', 'john.doe@example.com', '555-123-4567'),
('Jane', 'Smith', '1990-09-10', '456 Oak Ave, Townsville', 'jane.smith@example.com', '555-987-6543'),
('Alice', 'Brown', '1975-12-22', '789 Pine Rd, Villagetown', 'alice.brown@example.com', '555-111-2222'),
('Bob', 'Jones', '1980-03-05', '321 Birch Ln, Hamletburg', 'bob.jones@example.com', '555-333-4444');

-- Insert data into the clinician table
INSERT INTO clinician (npi, firstname, lastname, organization, address, city, state, postal_code) VALUES
(100200300, 'Emily', 'Green', 'Med Ltd.', '101 Hospital Way', 'Medicity', 'Medstate', 'G5G 5G5'),
(100200301, 'James', 'White', 'Health Inc.', '202 Wellness Rd', 'Healthville', 'Healthstate', 'H7H 7H7');

-- Insert data into the appointments table
INSERT INTO appointments (appointed_patient, scheduled_clinician, appointment_date, appointment_time, status) VALUES
(1, 100200300, '2024-12-16', '09:00:00', 'Scheduled'),
(2, 100200301, '2024-12-16', '10:30:00', 'Scheduled'),
(3, 100200300, '2024-12-17', '14:00:00', 'Completed'),
(4, 100200301, '2024-12-17', '15:15:00', 'Completed'),
(1, 100200300, '2024-12-18', '08:30:00', 'No Show'),
(2, 100200301, '2024-12-18', '13:00:00', 'Scheduled'),
(3, 100200300, '2024-12-19', '11:45:00', 'Scheduled'),
(4, 100200301, '2024-12-19', '16:00:00', 'Scheduled'),
(1, 100200300, '2024-12-20', '09:15:00', 'Scheduled'),
(2, 100200301, '2024-12-20', '14:30:00', 'Completed'),
(3, 100200300, '2024-12-23', '10:00:00', 'Scheduled'),
(4, 100200301, '2024-12-23', '11:30:00', 'Scheduled'),
(1, 100200300, '2024-12-24', '08:00:00', 'No Show'),
(2, 100200301, '2024-12-24', '12:00:00', 'Scheduled'),
(3, 100200300, '2024-12-26', '09:30:00', 'Scheduled'),
(4, 100200301, '2024-12-26', '15:45:00', 'Scheduled'),
(1, 100200300, '2024-12-27', '10:15:00', 'Completed'),
(2, 100200301, '2024-12-27', '13:45:00', 'Scheduled');