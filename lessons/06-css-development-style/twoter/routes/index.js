var routes = {};

routes.homePage = function(req,res){
	res.render('index', {message: "rendered index"})
};

module.exports = routes;