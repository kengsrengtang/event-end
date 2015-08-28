var database  = require('pg');
var config = require('config');
var moment = require('moment');

exports.get_now_ts = function() {
	return moment.utc().format("YYYY-MM-DD HH:MM:SS");
}

exports.get_conn_url = function() {
  return "postgres://" + config.dbConfig.user + ":" + config.dbConfig.password + "@" + config.dbConfig.host + ":" + config.dbConfig.port + "/" + config.dbConfig.database;
}

exports.get_db = function() {
  return database;
}
