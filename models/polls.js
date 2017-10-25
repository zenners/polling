var
  mongoose= require('mongoose');
  Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: String,
  text: String,
  countries: [],
  startDate: {type: Date},
  endDate: {type: Date},
  status: String,
  voteAction: String, //evict,nominate,save
  voteType: String, // single || multiple
  mechanics: {
    count: Number,
    rule: String
  },
  options: [{
    optionName: String,
    thumbnail: String, //image url
    //id ref of candidate
    votes: Number
  }],
  chartType: String,
  creator: String
}, { timestamps: true);

PollSchema.methods.updateVotes = function(optionnumber){
  if(typeof optionnumber === 'number' && optionnumber<this.options.length){
    this.options[optionnumber].votes+=1;
  }
}


var Polls = mongoose.model('Polls', PollSchema);
module.exports= Polls;
