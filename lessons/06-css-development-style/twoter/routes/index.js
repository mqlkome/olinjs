var routes = {};
var Twote = require('../models/twoteModel')
var User = require('../models/userModel')

routes.homePage = function(req,res){
	console.log("session from index.homePage")
	console.log(req.session)
	Twote.find({}).sort({'_id' : -1}).exec(function (error, twotes){
		if (error){
			console.log(error);
		} else{
			console.log(twotes[0]);
			res.render('index', {twotes: twotes});
		}
	});
};

routes.addTwote = function(req, res){
	var twote = new Twote({
		user_id: req.session.userID,
		twote: req.body.twote
	});
	twote.save(function(err,data){
		if (err) {res.status(500).send('Error when saving new twote to db')}
		User.find(req.session.userID, function (err, user){
			console.log("twote.save data")
			console.log(data)
			// data.name = user.name;
			data = {twote: data, user: user};
			res.send(data)
		})
	});
};

module.exports = routes;