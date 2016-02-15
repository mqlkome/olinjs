var mongoose = require('mongoose');

// Create a Schema
var ingredientSchema = mongoose.Schema({
  name: String,
  cost: Number
});

module.exports = mongoose.model("ingredient", ingredientSchema);