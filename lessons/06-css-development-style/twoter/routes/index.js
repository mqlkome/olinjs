var routes = {};
var Twote = require('../models/twoteModel')
var User = require('../models/userModel')
var flag;

routes.homePage = function(req,res){
	Twote.find({}).sort({'_id' : -1}).exec(function (error, twotes){
		if (error){
			console.log(error);
		} else{
			User.findOne({_id: req.session.userID}, function (err, user){
				User.find({}, function (err, users){
					if (err){console.log(err)}
					if(user){
						res.render('index', {twotes: twotes, user: user.username, flag:false, users: users});
					} else{
						res.render('index', {twotes: twotes, user: "Guest", flag:true, users: users})
				}})
			})
		}
	});
};

routes.addTwote = function(req, res){
	var user = {_id: req.session.userID}
	User.findOne(user, function (err, user){
		var twote = new Twote({
			user_id: req.session.userID,
			twote: req.body.twote,
			username: user.username
		});
		twote.save(function(err,data){
			if (err) {res.status(500).send('Error when saving new twote to db')}
			res.send(data)
		});
	})
};

routes.eraseTwote = function(req, res){
	Twote.findOne({_id: req.body.id}, function(err, doc){
		if (doc.user_id === req.session.userID){
			doc.remove(function(err, doc){
				if (err){
					res.status(500).send('Error when removing twote from db')
				};
			res.send(req.body);
			})
		}else{res.send({noDeleting: true})}
	});
};
module.exports = routes;