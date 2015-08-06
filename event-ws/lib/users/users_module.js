var regStatus  = require('../users/reg_status_constants');
var phoneUtils  = require('../users/phone_number_norm');
var moment = require('moment');

var dbAPI = require('../db_layer');

var priv_create_user = function(newUser, response, success_cb, error_cb) {
  if (!newUser.phone_number) {
    console.error("Must specify phone_number attribute in user object");
  }
  newUser.phone_number = phoneUtils.normalize_phone_number(newUser.phone_number);
  theNow = dbAPI.get_now_ts();
  newUser.created_time = theNow;
  newUser.last_updated_time = theNow;
  console.log("Trying to create a new user/attendee with phone number " + newUser.phone_number);
  dbAPI.get_conn().query("INSERT INTO Users SET ?", newUser, function(err, result) {
  if (err) {
      error_cb(response, err)
  } else {
      success_cb(response, result.id);
    }
  });
}

exports.create_user = function(newUser, response, success_cb, error_cb) {
  console.log("Creating a user");
  newUser.reg_status = regStatus.PENDING_VERIFICATION;
  priv_create_user(newUser, response, success_cb, error_cb);
}

exports.create_attendee = function(newUser, response, success_cb, error_cb) {
  console.log("Creating an attendee");
  newUser.reg_status = regStatus.UNREGISTERED;
  priv_create_user(newUser, response, success_cb, error_cb);
}

exports.get_users_by_phone = function (phoneNumber, response, success_cb, error_cb) {
	console.log("getting user whose phone number is " + phoneNumber);
	dbAPI.get_conn().query("SELECT * FROM Users WHERE phone_number = " + phoneNumber, function(err, result) {
		if (err) {
			error_cb(response, err)
		} else {
      if (result.length > 0)
			 success_cb(response, result[0]);
      else 
        error_cb(response, {message: "No user having phone number " + phoneNumber});
		}
	});
}

exports.get_users_by_id = function (dbId, response, success_cb, error_cb) {
  console.log("getting user whose db id is " + dbId);
  dbAPI.get_conn().query("SELECT * FROM Users WHERE id = " + dbId, function(err, result) {
    if (err) {
      error_cb(response, err)
    } else {
      if (result.length > 0)
       success_cb(response, result[0]);
      else 
        error_cb(response, {message: "No user having user id " + dbId});
    }
  });
}

exports.delete_user = function (phoneNumber, response, success_cb, error_cb) {
  console.log("deleting user whose phone number is " + phoneNumber);
  if(phoneNumber) {
    dbAPI.get_conn().query("DELETE FROM Users WHERE phone_number = " + phoneNumber, function (err, result) {
      if (err) {
        error_cb(response, err)
      } else {
        // assuming only 1 match
        success_cb(response, result[0]);
      }
    });
  }
}
