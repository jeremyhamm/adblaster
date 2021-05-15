/**
Add extensions
*/
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/**
Create table for domains
*/
CREATE TABLE IF NOT EXISTS domains (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NULL,
  ip VARCHAR(15) NULL,
  host VARCHAR(255) NOT NULL, 
  category VARCHAR(50) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  validated BOOLEAN NOT NULL,
  created_date TIMESTAMP NOT NULL,
  modified_date TIMESTAMP NULL
);

/**
Create unique index on host column
*/
CREATE UNIQUE INDEX CONCURRENTLY host_idx ON domains (host);

/**
Add unique constraint to domains table
*/
ALTER TABLE domains 
ADD CONSTRAINT unique_host 
UNIQUE USING INDEX host_idx;