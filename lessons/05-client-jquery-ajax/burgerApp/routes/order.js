var routes = {};
var Order = require('../models/orderModel')


routes.submitOrder = function(req, res){
	// When pushing your "final" code in your master branch on github remove all 
	// log statements :)
	console.log("body")
	console.log(req.body)
	var order = new Order({
		name: req.body.name, 
		//jquery is rude and does this wierd [] thing.

		// I know why jQuery does this. When making a POST req from jquery to the backend
		// you should json.stringify the list of ingerdients you are sendin over. Then you can access the key 
		// of the object by req.body.choises :) I fixed it for you so you can check it out. Go look
		// for the change in /public/javascripts/order.js line 32.
		choices: req.body.choices
	});
	order.save(function(err, data){
		if (err) {res.status(500).send('Error when saving new order to db')}
		res.send(data)
	});
};

module.exports = routes;