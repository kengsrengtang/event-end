var frisby = require('frisby');

frisby.create('Create a new user')
  .post('http://localhost:8080/users', {
    phone_number: 4083682708,
    first_name: 'Huey',
    last_name: 'Tuteja'
  })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON('0', {
    place: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); }, // Custom matcher callback
    user: {
      verified: false,
      location: "Oklahoma City, OK",
      url: "http://brightb.it"
    }
  })
  .expectJSONTypes('0', {
    id_str: String,
    retweeted: Boolean,
    in_reply_to_screen_name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
    user: {
      verified: Boolean,
      location: String,
      url: String
    }
  })
.toss();

frisby.create('Get Event User by Phone number')
  .get('http://localhost:8080/users?phone=4083682708')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON('0', {
    place: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); }, // Custom matcher callback
    user: {
      verified: false,
      location: "Oklahoma City, OK",
      url: "http://brightb.it"
    }
  })
  .expectJSONTypes('0', {
    id_str: String,
    retweeted: Boolean,
    in_reply_to_screen_name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
    user: {
      verified: Boolean,
      location: String,
      url: String
    }
  })
.toss();

frisby.create('Get Event User by id')
  .get('http://localhost:8080/users?id=1')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON('0', {
    place: function(val) { expect(val).toMatchOrBeNull("Oklahoma City, OK"); }, // Custom matcher callback
    user: {
      verified: false,
      location: "Oklahoma City, OK",
      url: "http://brightb.it"
    }
  })
  .expectJSONTypes('0', {
    id_str: String,
    retweeted: Boolean,
    in_reply_to_screen_name: function(val) { expect(val).toBeTypeOrNull(String); }, // Custom matcher callback
    user: {
      verified: Boolean,
      location: String,
      url: String
    }
  })
.toss();