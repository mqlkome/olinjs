var mongoose = require('mongoose');

// Create a Schema
var orderSchema = mongoose.Schema({
  name: String,
  choices: [String]
});

module.exports = mongoose.model("order", orderSchema);