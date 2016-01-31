var express = require('express');
var router = express.Router();
var db = require('../fakeDatabase');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { message: 'Welcome to Cast School of Wizardry. If you want ' +
  'to be a wizard, you are in the wrong place. This is a cat sanctuary.'});
});


function Cat(){
	//name stuff
	var nameArray = ['Mouse', 'Horse', 'Collie', 'Birdie', 'Lizard', 'Snake'];
	var newName = nameArray[Math.round(Math.random() * (nameArray.length - 1))]; //thanks stack overflow
	//color stuff
	var colorArray = ['chocolate', 'lime', 'orange', 'plum', 'peach', 'cream', 'honey', 'tea', ]
	var newColor = colorArray[Math.round(Math.random() * (colorArray.length - 1))];
	
	var newAge = Math.floor((Math.random() * 100) + 1);

	var cat = {
		name: newName,
		color: newColor,
		age: newAge,
	};
	return cat;
}
router.get('/cats/new', function(req, res, next){
	var newCat = Cat() 
	db.add(newCat)
	//res.render('newcatpage', {newcatinfo: 'Added cat named ' + newCat.name + '. Color: ' + newCat.color + ' Age: ' + newCat.age})
	res.send('Added cat named ' + newCat.name + '. Color: ' + newCat.color + ' Age: ' + newCat.age)
});

router.get('/cats', function(req, res, next){
	var cats = db.getAll();
	var msg = 'These are all the cats that live here: '
	cats.forEach(function(kitty){
		msg = msg + kitty.name + ', ';
	});
	res.send(msg);
	//a list of cats, sorted by age, display their names, colors, ages
});

// router.get('/cats/bycolor/:color', function(req, res, next){
	//shows a list of cats of a particular color (parameter :color) sorted by age
// });

router.get('/cats/delete/old', function(req, res, next){
	var allCats = db.getAll();
	var firstCat = allCats[0].name;
	res.send(firstCat + ' has left the sanctuary');
	db.remove(0)

	//deletes the oldest cat from the "db" and it shouldn't appear on any lists
	//verification message
});

module.exports = router;


