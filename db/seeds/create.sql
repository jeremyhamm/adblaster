-- Create DB
CREATE DATABASE adblaster

-- Create table for domains
CREATE TABLE domains (
  id uuid DEFAULT uuid_generate_v4 (),
  name VARCHAR(255) NOT NULL,
  protocol VARCHAR(6) NULL,
  host VARCHAR(255) NOT NULL, 
  category VARCHAR(50) NOT NULL,
  owner VARCHAR(50) NOT NULL,
  validated BOOLEAN NOT NULL,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NULL
);