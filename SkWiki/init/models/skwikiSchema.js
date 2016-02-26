var mongoose = require('mongoose');
module.exports = mongoose.model("skwiki", {
  title: String,
  text: String
});