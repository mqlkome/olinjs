routes = {};

routes.logOut = function(req, res){
	req.session.userID = undefined;
	res.redirect('/login');
};

module.exports = routes;