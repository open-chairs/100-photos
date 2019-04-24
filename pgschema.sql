
CREATE database gallery;

\connect gallery;

CREATE TABLE photos (
  url VARCHAR(255),
  restaurant_id INT,
  description VARCHAR(255), 
  date VARCHAR(255), 
  source VARCHAR(255)
);