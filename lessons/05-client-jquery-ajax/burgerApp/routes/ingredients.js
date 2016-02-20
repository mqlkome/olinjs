var routes = {};
var Ingredient = require('../models/ingredientModel')

routes.addIngredient = function(req, res){
	//req will have data from AJAX, this will save it to the database, 
	//and the callback will res.send some information about the data that was saved.
	//could also do some legitimacy/sense checks

	// Note: Check if cost!=="" --> Then save, otherwise save and set value of ""/null to 0, perhaps.
	var ingr = new Ingredient({
		name: req.body.name, 
		cost: req.body.cost
	});
	ingr.save(function(err, data){
		if (err) {res.status(500).send('Error when saving new ingredient to db')}
		res.send(data)
	});
};

routes.editIngredient = function(req, res){
	Ingredient.findOneAndUpdate({_id: req.body.id}, {$set:req.body}, {new: true}, function(err, doc){
	    if(err){
	        res.status(500).send('Something wrong when updating data!');
	    };
	    res.send(req.body);
	});
};

routes.oosIngredient = function(req, res){
	Ingredient.findByIdAndRemove(req.body.id, function(err, doc){
		if (err){
			res.status(500).send('Error when removing ingredient from db')
		};
		res.send(req.body);
	});
};

module.exports = routes;