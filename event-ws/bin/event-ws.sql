USE eventws;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` BIGINT(15) NOT NULL UNIQUE,
  `first_name` VARCHAR(50),
  `last_name` VARCHAR(50),
  `reg_status` TINYINT NOT NULL,
  `email` VARCHAR(150),
  `created_time` DATETIME NOT NULL,
  `last_updated_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `Events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `theme` VARCHAR(255),
  `place` VARCHAR(255),
  `time` DATETIME NOT NULL,
  `duration` INT DEFAULT -1,
  `notes` TEXT,
  `created_time` DATETIME NOT NULL,
  `last_updated_time` DATETIME NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `EventAttendees` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11),
  `user_id` int(11),
  `attendee_role` TINYINT NOT NULL,
  `attendee_status` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`event_id`) REFERENCES `Events`(`id`),
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`)
);