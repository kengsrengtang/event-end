USE eventws;

CREATE TABLE Users (
  id BIGSERIAL,
  phone_number BIGINT NOT NULL UNIQUE,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  reg_status SMALLINT NOT NULL,
  email VARCHAR(150),
  created_time TIMESTAMPTZ NOT NULL,
  last_updated_time TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE Events (
  id BIGSERIAL,
  name VARCHAR(255) NOT NULL,
  theme VARCHAR(255),
  place VARCHAR(255),
  time TIMESTAMPTZ NOT NULL,
  duration INT DEFAULT -1,
  notes TEXT,
  created_time TIMESTAMPTZ NOT NULL,
  last_updated_time TIMESTAMPTZ NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE EventAttendees (
  id BIGSERIAL,
  event_id BIGINT,
  user_id BIGINT,
  attendee_role SMALLINT NOT NULL,
  attendee_status SMALLINT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (event_id) REFERENCES Events(id),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);