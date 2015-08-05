var constants  = require('../constants');

var dbConn = require('../db_layer');

exports.create_user = function(newUser, response, success_cb, error_cb) {
  if (!newUser.phone_number) {
    console.error("Must specify phone_number attribute in user object");
  }
  newUser.registration_status = constants.PENDING_VERIFICATION;
  console.log("Trying to create a new user with phone number " + newUser.phone_number);
  dbConn.get_conn().query("INSERT INTO EventUsers SET ?", newUser, function(err, result) {
	if (err) {
  	  error_cb(response, err)
	} else {
      success_cb(response, result.id);
    }
  });
}

exports.get_users_by_phone = function (phoneNumber, response, success_cb, error_cb) {
	console.log("getting user whose phone number is " + phoneNumber);
	dbConn.get_conn().query("SELECT * FROM EventUsers WHERE phone_number = " + phoneNumber, function(err, result) {
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
  dbConn.get_conn().query("SELECT * FROM EventUsers WHERE id = " + dbId, function(err, result) {
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
    dbConn.get_conn().query("DELETE FROM EventUsers WHERE phone_number = " + phoneNumber, function (err, result) {
      if (err) {
        error_cb(response, err)
      } else {
        // assuming only 1 match
        success_cb(response, result[0]);
      }
    });
  }
}
