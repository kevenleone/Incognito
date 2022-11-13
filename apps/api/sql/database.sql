CREATE DATABASE INCOGNITO;

CREATE TABLE DeviceCheckin (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  deviceMetadata TEXT,
  deviceId VARCHAR(100) NOT NULL,
  longitude FLOAT(10,6),
  latitude FLOAT(10,6),
  score VARCHAR(100),
  createdAt TIMESTAMP default now(),
  modifiedAt TIMESTAMP default now()
)