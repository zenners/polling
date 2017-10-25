var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

 var userScheme = new Schema({

  votedPolls: ['77']
 });

// create canVote boolean, accepts rule and pollid
// create map of rules to function to apply to user and poll
// return true if user's vote is allowed to go through

function votePerDay(user,poll){
  // code to check if the user has voted today
}

userScheme.methods.hasVoted =  function(pollid){
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

var User = mongoose.model('User', userScheme);
module.exports = User;
