var mongoose = require('mongoose');

var twoteSchema = mongoose.Schema({
  twote: String,
  user_id: String
});

module.exports = mongoose.model("twote", twoteSchema);