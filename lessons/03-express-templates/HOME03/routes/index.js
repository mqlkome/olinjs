var express = require('express');
var router = express.Router();
// var db = require('../fakeDatabase');
var Cat = require('../models/catModel.js');

var nameArray = ['Mouse', 'Horse', 'Collie', 'Birdie', 'Lizard', 'Snake'];
var colorArray = ['chocolate', 'lime', 'orange', 'plum', 'peach', 'cream', 'honey', 'tea', ]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: 'Welcome to Cast School of Wizardry. If you want ' +
  'to be a wizard, you are in the wrong place. This is a cat sanctuary.'});
});


function makeCat(){
	var ind = Math.round(Math.random() * (nameArray.length - 1));//thanks stack overflow
	var newName = nameArray[ind];
	//TODO: If you restart the app, the old cats from the previous 
	//run will persist and you will end up with cats with the same name. 
	//In the future, there should be something that checks the existing names 
	//doesn't reuse them. 
	nameArray.splice(ind, 1); //don't reuse names
	var newColor = colorArray[Math.round(Math.random() * (colorArray.length - 1))];
	var newAge = Math.floor((Math.random() * 100) + 1);
	//create db entry
	var cat = {
		name: newName,
		color: newColor,
		age: newAge,
	};
	return cat;
}

router.get('/cats/new', function(req, res, next){
	var newCat = new Cat(makeCat());
	if (newCat.name){
		newCat.save(function (err, newCat) {
  			if (err) return console.error(err);
  			res.send('Added cat named ' + newCat.name + '. Color: ' + newCat.color + ' Age: ' + newCat.age)
		});	
	} else {res.send("You've already got more cats than you can care for. Love those who are already here.")}
});

router.get('/cats', function(req, res, next){
	// var cats = db.getAll();
	Cat.find(function (err, cats) {
  		if (err) return console.error(err);
  			function compare(a,b) {
	            return b.age-a.age;
	        }
	        cats = cats.sort(compare);
  		var msg = 'These are all the cats that live here: ' + '</br>'
		cats.forEach(function(kitty){
			msg = msg + kitty.name + ' ('+ kitty.color + ', ' + kitty.age + ')' + '</br>';
		});
		res.send(msg);
	});
});

router.get('/cats/old/bye', function(req, res, next){
	Cat.find(function (err, cats) {
		if (err) return console.error(err);
		//do sorting here
		if (cats[0]){
			function compare(a,b) {
	            return b.age-a.age;
	        }
	        cats = cats.sort(compare);
	        var firstCat = cats[0].name;
			Cat.findOneAndRemove({name: firstCat}, function(err){
				if (err) return console.error(err);
				res.send(firstCat + ' has left the sanctuary');
			});
		} else {res.send("You're the only one here. What now?")}
	})
});

router.get('/cats/bycolor/:color', function(req, res, next){
	Cat.find(function (err, cats) {
		var colorChoice = req.params.color;
		cats = cats.filter(function(entry){
			return entry.color === colorChoice;
		});
		var msg = 'These are all the ' + colorChoice + ' cats that live here: ' + '</br>'
		cats.forEach(function(kitty){
			msg = msg + kitty.name + ' ('+ kitty.color + ', ' + kitty.age + ')' + '</br>';
		});
		res.send(msg);
	})
});

router.get('/cats/observeUnder/:age', function(req, res, next){
	var ageChoice = req.params.age;
	Cat.find({ age: { $lt: ageChoice } }, function(err, youngCats){
		//TODO: should do something else if there are no cats under ageChoice
		console.log(youngCats);
		var msg = 'These cats are playing. So rambunctious! Aww.: ' + '</br>'
		youngCats.forEach(function(kitty){
			msg = msg + kitty.name + '</br>';
		});
		res.send(msg);
	})
});

module.exports = router;