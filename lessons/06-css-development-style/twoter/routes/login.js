var routes = {};
routes.loginPage = function(req,res){
	res.render('login', {message: "rendered login"})
};
module.exports = routes;