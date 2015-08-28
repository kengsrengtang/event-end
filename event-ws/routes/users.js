var express = require('express');
var router = express.Router();
var users_comp = require('../lib/users/users_module');


var prep_response = function(res, statusCode) {
  res.contentType('application/json');
  res.statusCode = statusCode;
}


/* GET users listing. */
var get_user_success = function(res, userObject) {
  console.log("get user success is " + userObject);
  prep_response(res, 200);
  res.send(userObject);
};

var get_user_err = function(res, err) {
  console.error("failed to get user. error is " + err);
  prep_response(res, 500);
  res.send({'status': 1, 'message': err.message});
};

router.get('/:id', function(req, res, next) {
  	// get the users using the id
    console.log("id query param " + req.params.id);
    users_comp.get_users_by_id(req.params.id, res, get_user_success, get_user_err);
});

router.get('/', function(req, res, next) {
  if (req.query.phone_number) {
    console.log("phone query param " + req.query.phone_number);
  	// get the users using phone number
  	users_comp.get_users_by_phone(req.query.phone_number, res, get_user_success, get_user_err);
  } else {
  	console.error("Must specify phone_number in query");
    prep_response(res, 500);
    res.send({'status': 1, 'message': "Must specify phone_number in query"});
  }
});


/* POST new user */
var create_user_success = function(res, id) {
  console.log("create user success id is " + id);
  prep_response(res, 200);
  res.send({'status': 0, 'user_id': id});
};

var create_user_err = function(res, err) {
  console.error("failed to create user. error is " + err);
  prep_response(res, 500);
  res.send({'status': 1, 'message': err.message});
};

router.post('/', function(req, res, next) {
  console.log("creating a new user " + req.body.phone_number);
  users_comp.create_user(req.body, res, create_user_success, create_user_err);
});


/* DELETE user */
var delete_user_success = function(res, id) {
  console.log("delete user success id is " + id);
  prep_response(res, 200);
  res.send({'status': 0, 'user_id': id});
};

var delete_user_err = function(res, err) {
  console.error("failed to delete user. error is " + err);
  prep_response(res, 500);
  res.send({'status': 1, 'message': err.message});
};

router.delete('/', function(req, res, next) {
  console.log("deleting user whose phone number is " + req.query.phone_number);
  users_comp.delete_user(req.query.phone_number, res, delete_user_success, delete_user_err);
});

module.exports = router;
