USE eventws;

CREATE TABLE `EventUsers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` BIGINT(15) NOT NULL UNIQUE,
  `first_name` VARCHAR(50),
  `last_name` VARCHAR(50),
  `registration_status` INT NOT NULL,
  `email` VARCHAR(150),
  PRIMARY KEY (`id`)
);
