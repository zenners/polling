var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var findIndex = require('lodash.findindex')

var PollSchema = new Schema({
  name: { type: String, required: true },
  text: { type: String, required: true },
  countries: [],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, required: true },
  // voteAction: { type: String, required: true }, //evict,nominate,save
  voteType: { type: String, required: true }, // single || multiple
  mechanics: {
    count: { type: Number, required: true },
    rule: { type: String, required: true },
  },
  options: [{
    optionName: { type: String, required: true },
    thumbnail: { type: String }, //image url
    //id ref of candidate
    votes: 0,
  }],
  chartType: { type: String },
  creator: { type: mongoose.Schema.Types.ObjectId, required: true },
}, { timestamps: true});

PollSchema.methods.updateVotes = function(votes){
  votes.map(item => {
    const itemIndex = findIndex(item)
    this.options[itemIndex].votes+=1;
  })
  return this.options
}


var Polls = mongoose.model('Polls', PollSchema);
module.exports = Polls;
