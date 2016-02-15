var Ingredient = require('../models/ingredientModel')

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
	res.render('order', {message: 'order routed!'});
};
routes.kitchenPage = function(req, res){
	res.render('kitchen', {message:'kitchen routed!'});
};

module.exports = routes;




	Ingredient.find({}, function (error, ingredients){
		if (error){
			console.log(error);
		} else{
			res.render('order', {ingredients: ingredients});
		}
	});