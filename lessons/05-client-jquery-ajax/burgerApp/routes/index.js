//index.js contains the routes for the main pages to render and get the needed docs from the db.
var Ingredient = require('../models/ingredientModel')
var Order = require('../models/orderModel')

var routes = {};

routes.homePage = function(req, res){
	res.render('index', {message: 'This is the burger app homepage.'});
};
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




