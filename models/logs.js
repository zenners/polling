// log actions in polls by user and action and status
var mongoose= require('mongoose');
var Schema = mongoose.Schema;

var LogSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  action: { type: String, required: true }
}, { timestamps: true});

var Logs = mongoose.model('Logs', LogSchema);
module.exports = Logs;
