USE eventws;

CREATE TABLE Users (
  id BIGSERIAL,
  data JSONB NOT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE Events (
  id BIGSERIAL,
  data JSONB NOT NULL,
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