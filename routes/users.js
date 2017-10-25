var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var userSchema = require('../models/users');
var User = mongoose.model('User', userSchema);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Create user
router.post('/create', function(req, res, next){
  const newUser = new User(req.body)
  newUser.save(function(err, user){
    if(err) res.json({message: "Error creating user", error: err})
    res.json(user)
  })
});

module.exports = router;
