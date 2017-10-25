var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var userSchema = new Schema({
   name: {type: String, required: true},
   votedPolls: []
 },{timestamps: true});

// create canVote boolean, accepts rule and pollid
// create map of rules to function to apply to user and poll
// return true if user's vote is allowed to go through

function votePerDay(user,poll){
  // code to check if the user has voted today
}

userSchema.methods.hasVoted =  function(pollid){
  var check = false;
  for(var i=0; i<this.votedPolls.length; i++){
    if(this.votedPolls[i] ==  pollid){
      check= true;
      break;
    }
  }

  if(check==false){
    this.votedPolls.push(pollid);
  }
  return check;
}

userSchema.methods.updateVotedPolls = function(pollid){
  this.votedPolls.concat(pollid)
  return this.votedPolls
}

module.exports = userSchema;
