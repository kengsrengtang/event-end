var mysql  = require('mysql');
var config = require('config');
var moment = require('moment');

var pool = mysql.createPool(config.get('dbConfig'));

exports.get_conn = function() {
	return pool;
}

exports.get_now_ts = function() {
	return moment.utc().format("YYYY-MM-DD HH:MM:SS");
}