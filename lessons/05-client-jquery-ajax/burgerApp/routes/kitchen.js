var routes = {};
var Order = require('../models/orderModel')

routes.finishOrder = function(req, res){
	Order.findByIdAndRemove(req.body.id, function(err, doc){
		if (err){
			res.status(500).send('Error when finishing order')
		};
		res.send(req.body);

	});
};

module.exports = routes;