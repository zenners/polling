var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Logs = require('../models/logs');

router.get('/', function(req, res, next) {
  Logs.find(function(err, log){
    if(err) res.json({message: 'Error retrieving logs,', error: err})
    res.json(log)
  })
});

module.exports = router;
