CREATE TABLE IF NOT EXISTS client (
id  INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
company_name TEXT, 
url TEXT,
pages INT, 
sector TEXT, 
contact_name TEXT,
role TEXT, 
address TEXT, 
mobile INT,
email TEXT,
date DATE
);


ALTER TABLE client
RENAME TO clients;

INSERT INTO clients (company_name, sector, contact_name, role) VALUES (
  'Sanders', 'Restaurant', 'Maurice Sanders', 'Chef'),
  ('FreeWings', 'Fitness', 'Rob Clark', 'Manager'),
  ('Rose', 'Beauty', 'Rose Smith', 'Hairdresser');


 NOT EXISTS audits (
id  INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
website_id INT,
seo_score INT,
performance_score INT, 
accesibility_score INT, 
lighthouse_score INT,
notes VARCHAR(250)
);


ALTER TABLE audits
ADD COLUMN url_page TEXT;

CREATE TABLE IF NOT EXISTS websites (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50),
  url TEXT
);


CREATE TABLE IF NOT EXISTS audits (
id  INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
website_url INT,
website_name,
seo_score INT,
performance_score INT, 
accesibility_score INT, 
lighthouse_score INT,
notes VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS websites (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50),
  url TEXT
);


---
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS clients (
id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id TEXT NOT NULL, 
company_name TEXT, 
contact_name TEXT,
contact_role TEXT,
phone_number TEXT,
email TEXT,
url TEXT,
description TEXT,  
address TEXT
);