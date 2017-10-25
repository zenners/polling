// collection for votes by users add index to pollid and userid,
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  pollID: { type: mongoose.Schema.Types.ObjectId, required: true }
}, { timestamps: true});

var Votes = mongoose.model('Votes', VoteSchema);
module.exports = Votes;
