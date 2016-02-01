var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');
var nameArray = ['Mouse', 'Horse', 'Collie', 'Birdie', 'Lizard', 'Snake'];
var colorArray = ['chocolate', 'lime', 'orange', 'plum', 'peach', 'cream', 'honey', 'tea', ]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: 'Welcome to Cast School of Wizardry. If you want ' +
  'to be a wizard, you are in the wrong place. This is a cat sanctuary.'});
});


function Cat(){
	var ind = Math.round(Math.random() * (nameArray.length - 1));//thanks stack overflow
	var newName = nameArray[ind]; 
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
	var newCat = Cat()
	if (newCat.name){db.add(newCat)} else {res.send("You've already got more cats than you can care for. Love those who are already here.")}
	res.send('Added cat named ' + newCat.name + '. Color: ' + newCat.color + ' Age: ' + newCat.age)
});

router.get('/cats', function(req, res, next){
	var cats = db.getAll();
	var msg = 'These are all the cats that live here: ' + '</br>'
	cats.forEach(function(kitty){
		msg = msg + kitty.name + ' ('+ kitty.color + ', ' + kitty.age + ')' + '</br>';
	});
	res.send(msg);
});

router.get('/cats/delete/old', function(req, res, next){
	var allCats = db.getAll();
	if (allCats[0]){
		var firstCat = allCats[0].name;
		res.send(firstCat + ' has left the sanctuary');
		db.remove(0);
	} else {res.send("You're the only one here. What now?")}

});

router.get('/cats/bycolor/:color', function(req, res, next){
	var allCats = db.getAll();
	var colorChoice = req.params.color;
	allCats = allCats.filter(function(entry){
		return entry.color === colorChoice;
	});
	var msg = 'These are all the ' + colorChoice + ' cats that live here: ' + '</br>'
	allCats.forEach(function(kitty){
		msg = msg + kitty.name + ' ('+ kitty.color + ', ' + kitty.age + ')' + '</br>';
	});
	res.send(msg);

});
module.exports = router;