create database if not exists smallproj;

CREATE TABLE if not exists `smallproj`.`login` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(50) NOT NULL DEFAULT '' UNIQUE,
  `password` VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`UserID`)
);


CREATE TABLE if not exists `smallproj`.`contacts` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL DEFAULT '',
  `phonenumber` VARCHAR(20) NOT NULL DEFAULT '',
  `address` VARCHAR(100) NOT NULL DEFAULT '',
  `UserID` INT,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`UserID`) REFERENCES `smallProj`.`login`(`UserID`)
);
