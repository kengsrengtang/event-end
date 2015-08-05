var mysql  = require('mysql');
var config = require('config');

var connection = mysql.createConnection(config.get('dbConfig'));

connection.connect();

exports.get_conn = function() {
	return connection;
}