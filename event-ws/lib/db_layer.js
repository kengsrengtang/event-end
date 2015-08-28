var database  = require('pg');
var config = require('config');
var moment = require('moment');
 
var pooler, slice = [].slice;


module.exports = pooler = {
  acquire: function(callback) {
    return database.connect("tcp://postgres:postgres@localhost/dummy_db", callback);
  },
  pooled: function(fn) {
    return function() {
      var callerArgs, callerCallback, callerHasCallback;
      callerCallback = arguments[arguments.length - 1];
      callerHasCallback = typeof callerCallback === 'function';
      callerArgs = Array.prototype.slice.call(arguments, 0, callerHasCallback ? -1 : void 0);
      return pooler.acquire(function(err, pgClient) {
        if (err != null) {
          return (err != null ? callerCallback(err) : void 0);
        }
        pgClient.pauseDrain();
        callerArgs.push(function() {
          pgClient.resumeDrain();
          if (callerHasCallback) {
            return callerCallback.apply(null, arguments);
          }
        });
        return fn.apply(null, [pgClient].concat(slice.call(callerArgs)));
      });
    };
  }
};


exports.get_now_ts = function() {
	return moment.utc().format("YYYY-MM-DD HH:MM:SS");
}