var express = require('express');
var router = express.Router();
var PollSchema = require('../models/polls');
var utils = require('./utils')

/* Create new poll. */
router.post('/create', function(req, res, next) {
  var data = req.body
  var newPoll = new PollSchema(data)
  newPoll.save(function(err, poll){
    if(err){
       res.json({message: 'Error creating poll', error: err})
    }else {
      utils.saveLogDetails(data.creator, 'Created a new poll.')
      res.json(poll)
    }
  })
});

router.post('/get', function(req, res, next){
  PollSchema.findOne({_id: req.body.pollID}, function(err, poll){
    if(err) res.json({message: 'Error fetching poll.', error: err})
    res.json(poll)
  })
})

router.post('/start', function(req, res, next){
  const data = req.body
  const params = { $set: { status: data.status } }
  PollSchema.updateOne({_id: data.pollID}, params, function(err, poll){
    if(err){
      res.json({message: `error changing poll to ${data.status}.`, error: err})
    }else{
      const action = data.status === 'Open' ? 'Opened' : 'Closed'
      utils.saveLogDetails(data.userID, `${action} a poll.`)
      res.json({message: `Poll changed to ${data.status}.`})
    }
  })
})

module.exports = router;
