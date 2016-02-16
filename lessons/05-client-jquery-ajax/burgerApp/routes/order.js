var routes = {};
var Order = require('../models/orderModel')

routes.submitOrder = function(req, res){
	console.log("body")
	console.log(req.body)
	var order = new Order({
		name: req.body.name, 
		//jquery is rude and does this wierd [] thing.
		choices: req.body["choices[]"]
	});
	order.save(function(err, data){
		if (err) {res.status(500).send('Error when saving new order to db')}
		res.send(data)
	});
};

module.exports = routes;