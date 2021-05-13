/*
Add extensions
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/*
Create table for domains
*/
CREATE TABLE IF NOT EXISTS domains (
  id uuid DEFAULT uuid_generate_v4 (),
  name VARCHAR(255) NOT NULL,
  ip VARCHAR(15) NULL,
  host VARCHAR(255) NOT NULL, 
  category VARCHAR(50) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  validated BOOLEAN NOT NULL,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NULL
);