//index.js contains the routes for the main pages to render and get the needed docs from the db.
var Ingredient = require('../models/ingredientModel')
var Order = require('../models/orderModel')

var routes = {};

routes.homePage = function(req, res){
	res.render('index', {message: 'This is the burger app homepage.'});
};

// Food for thought:
	// 1. routes.ingredientsPage and routes.orderPage are are doing the exact same
	// thing - they are providing our app with all the ingredients in the DB. Yet,
	// the only difference is that they render a different handlebars layout. How can you 
	// make this more modular? 
	
	// 2. What happens when I create an ingredient with no price? You need to keep
	// in ming those edge cases and handle potential null exceptions that might show up.
	// The problem with allowing an ingredient to be created with no price is that it has a null (NaN)
	// value and when we make an order the running sum of the order also fails and becomes
	// a NaN value.

// Other than that I love how you have broken down your API in three files!!
routes.ingredientsPage = function(req, res){
	Ingredient.find({}, function (error, ingredients){
		if (error){
			console.log(error);
		} else{
			res.render('ingredients', {ingredients: ingredients});
		}
	});
};
routes.orderPage = function(req, res){
	Ingredient.find({}, function(error, ingredients){
		if (error){
			console.log(error);
		}else{
			res.render('order', {ingredients: ingredients});
		}
	})
};
routes.kitchenPage = function(req, res){
	Order.find({}, function(error, orders){
		if (error){
			console.log(error);
		}else{
			res.render('kitchen', {orders: orders});
		}
	})
};

module.exports = routes;




