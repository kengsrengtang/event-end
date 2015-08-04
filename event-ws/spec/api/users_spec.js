var frisby = require('frisby');

frisby.create('Delete a user')
  .delete('http://localhost:8080/users/1')
.toss();

frisby.create('Delete a user')
  .delete('http://localhost:8080/users?phone_number=4083682708')
.toss();

frisby.create('Create a new user')
  .post('http://localhost:8080/users', {
    phone_number: 4083682708,
    first_name: 'Huey',
    last_name: 'Tuteja'
  })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    status: 0,
    user_id: 1
  })
.toss();

frisby.create('Get Event User by Phone number')
  .get('http://localhost:8080/users?phone=4083682708')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    id: 1,
    phone_number: 4083682708,
    first_name: '',
    last_name: '',
    registration_status: 0,
    email: null
  })
.toss();

frisby.create('Get Event User by id')
  .get('http://localhost:8080/users?id=1')
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    id: 1,
    phone_number: 4083682708,
    first_name: '',
    last_name: '',
    registration_status: 0,
    email: null
  })
.toss();