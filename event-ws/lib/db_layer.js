var mysql  = require('mysql');
var config = require('config');
var moment = require('moment');

var connection = mysql.createConnection(config.get('dbConfig'));

connection.connect();

exports.get_conn = function() {
	return connection;
}

exports.get_now_ts = function() {
	return moment.utc().format("YYYY-MM-DD HH:MM:SS");
}