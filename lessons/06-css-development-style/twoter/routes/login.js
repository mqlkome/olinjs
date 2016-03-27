var User = require('../models/userModel')
//var findOrCreate = require('mongoose-findorcreate')
var routes = {};

routes.loginPage = function(req,res){
	res.render('login', {message: "Welcome to Twoter"})
};

routes.logIn = function(req, res, next){
	User.find({username: req.body.username},function (error, user){
		if (error){res.status(500).send('Error when looking up entered username')
		} else{
			if(user.length > 0){
				//TODO: make sure that there cannot be more than one user with the same name
				req.session.userID = user[0]._id;
				res.redirect('/')
			} else{
				var newUser = new User({
					username: req.body.username
				});
				newUser.save(function(err,data){
					if (err) {res.status(500).send('Error when saving new user to db')}
					req.session.userID = data._id
					res.redirect('/')
				});
			}
		}
	});
	
};

module.exports = routes;
