var moment = require('moment');
var dbAPI = require('../db_layer');
var roleConstants = require('../events/attendee_role_constants');
var statusConstants = require('../events/attendee_status_constants');

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

exports.create_event = function(newEvent, response, success_cb, error_cb) {
  console.log("Creating an event");
  newUser.reg_status = regStatus.PENDING_VERIFICATION;
}
