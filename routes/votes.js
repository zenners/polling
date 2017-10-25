var express = require('express');
var router = express.Router();
var async = require('async');
var mongoose = require('mongoose');
var userSchema = require('../models/users');
var User = mongoose.model('User', userSchema);
var Votes = require('../models/votes');
var Polls = require('../models/polls');

/*Submit poll vote. */

function getUser(req,res,next){
  User.findOne({"_id": req.body.userID}, (err, user)=>{
    if (err) next(err)
    req.currentUser = user
    next()
  })
}

function canVote(req,res,next){
  var currentUser = req.currentUser
  req.hasVoted = currentUser.hasVoted(req.body.pollID)
  next()
}

router.post('/submit', [getUser, canVote], function(req, res, next) {
  const data = req.body
  if(req.hasVoted){
    res.json({message: "You already voted in this poll."})
  }else{
    const newVotes = new Votes(data)
    newVotes.save(function(err, vote){
      if(err){
        res.json({message: "Error saving vote", error: err})
      }else{
        Polls.findOne({"_id": data.pollID}, function(err, poll){
          if(err){
            res.json({message: "Error finding poll", error: err})
          }else{
            var options = poll.updateVotes(data.votes)
            Polls.updateOne({_id: data.pollID}, {$set: {options}}, function(err, updated){
              if(err){
                 res.json({message: "Error updating poll", error: err})
              }else{
                var votedPolls = req.currentUser.updateVotedPolls(data.pollID)
                User.updateOne({_id: data.userID}, {$set: {votedPolls}}, function(err, voted){
                  if(err) res.json({message: "Error saving updated poll", error: err})
                  res.json({message: "Vote submitted."})
                })
              }
            })
          }
        })
      }
    })
  }
});

module.exports = router;
