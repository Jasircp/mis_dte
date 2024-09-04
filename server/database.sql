CREATE DATABASE project;

CREATE TABLE employees(
    emp_id VARCHAR(50) PRIMARY KEY,
    emp_name VARCHAR(255),
    phone VARCHAR(100),
    email VARCHAR(100),
    college VARCHAR(255),
    post VARCHAR(100),
    join_date date
);