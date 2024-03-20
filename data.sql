DROP DATABASE IF EXISTS ycyw_db;
CREATE DATABASE ycyw_db;
USE ycyw_db;

CREATE TABLE address (
  id INT PRIMARY KEY AUTO_INCREMENT,
  street_number INT NOT NULL,
  street_name VARCHAR(255) NOT NULL,
  zip_code INT NOT NULL,
  city VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL
);

CREATE TABLE user (
  email VARCHAR(100) PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  birth_date DATE,
  address_id INT,
  FOREIGN KEY (address_id) REFERENCES address (id)
);

CREATE TABLE agency (
  id INT PRIMARY KEY AUTO_INCREMENT,
  address_id INT NOT NULL,
  FOREIGN KEY (address_id) REFERENCES address (id)
);

CREATE TABLE rental (
  id INT PRIMARY KEY AUTO_INCREMENT,
  departure_date TIMESTAMP NOT NULL,
  arrival_date TIMESTAMP NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) NOT NULL,
  user_email VARCHAR(100) NOT NULL,
  FOREIGN KEY (user_email) REFERENCES user (email),
  departure_agency_id INT NOT NULL,
  FOREIGN KEY (departure_agency_id) REFERENCES agency (id),
  arrival_agency_id INT NOT NULL,
  FOREIGN KEY (arrival_agency_id) REFERENCES agency (id)
);