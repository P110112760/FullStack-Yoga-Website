CREATE DATABASE IF NOT EXISTS FullStack;
USE FullStack;

CREATE TABLE Customer (
    customerID INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Username VARCHAR(255) NOT NULL
);

CREATE TABLE Coach (
    coachID INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    bio TEXT
);

CREATE TABLE ClassYoga (
    classID INT AUTO_INCREMENT PRIMARY KEY,
    coachID INT,
    title VARCHAR(100),
    time TIME,
    date DATE,
    duration INT,
    description TEXT,
    FOREIGN KEY (coachID) REFERENCES Coach(coachID)
);

CREATE TABLE Booking (
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    classID INT,
    customerID INT,
    FOREIGN KEY (classID) REFERENCES ClassYoga(classID),
    FOREIGN KEY (customerID) REFERENCES Customer(customerID),
    UNIQUE (classID, customerID)
);
