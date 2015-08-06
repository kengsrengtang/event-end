var express = require('express');
var router = express.Router();
var events_comp = require('../lib/events/events_module');


router.post('/', function(req, res, next) {
  console.log("creating a new event " + req.body);
  events_comp.create_event(req.body, res, create_event_success, create_event_err);
});

module.exports = router;