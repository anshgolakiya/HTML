CREATE DATABASE college_db;

USE college_db;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL
);

INSERT INTO students (name, course)
VALUES
    ('Ansh', 'Computer Engineering'),
    ('Parth', 'IT Engineering');