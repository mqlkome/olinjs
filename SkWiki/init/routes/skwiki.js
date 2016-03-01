var express = require('express');
var router = express.Router();
var skwiki = require('../models/skwikiSchema');
var path = require('path'); //path allows the creation of paths (with /) from individual names

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/skwiki");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

var routes = {};


routes.getLinks = function(req, res) {
    console.log("hello, getLinks here")
    // use mongoose to get all Skwikis in the database
    skwiki.find(function(err, skwikis) {
        console.log(skwikis);
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(skwikis);
//return skwiki titles for listing
    });
};

routes.getSkwiki = function(req, res) {

    // use mongoose to get all todos in the database
    skwiki.findOne({_id: req.params.skwiki_id}, function(err, skwikis) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(skwikis);
        // comp.find(function(err, compl) {
        //   if (err)
        //     res.send(err)
        //   var results = {"todos": todos, "comp": compl}
        //   res.json(results);
        // });
         // return all skwikis in JSON format
    });
};

routes.searchSkwiki = function(req, res) {
	skwiki.find(function(err, skwikis) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        //use regular expressions to search all the entries for the letters in the search bar, if it finds them in any, it returns an object containing
        //all objects that don't contain null
		var returnSkwikis = {}
		for (var i = 0; i < skwikis.length; i++) {
			var str = skwikis[i].title
			var patt = new RegExp(req.params.skwiki_title);
			var res = patt.exec(str);
			if (res != null) {
				returnSkwikis.push(skwikis[i])
			} 
    	}
    	res.json(returnSkwikis)
});
}
// create todo and send back all todos after creation
routes.addSkwiki = function(req, res) {
    // create a skwiki, information comes from AJAX request from Angular
    console.log(req.body)
    skwiki.create({
        title : req.body.title,
        text : req.body.text
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the skwikis after you create another
        skwiki.find(function(err, skwikis) {
            if (err)
                res.send(err)
            res.json(skwikis);
        });
    });

};



// delete a todo
routes.deleteSkwiki = function(req, res) {
  //grab the todo and place it in a new database of completed todos
        skwiki.remove({
           _id : req.params.skwiki_id
        }, function(err, removed) {
            if (err)
               res.send(err);

            // get and return all the skwikis after you create another
            skwiki.find(function(err, skwikis) {
                if (err)
                    res.send(err)

                res.json(skwikis);
                
                
            });
        });
      
  
};

routes.editSkwiki = function(req, res) {
    console.log("editSkwiki req.body: ")
    console.log(req.body)
    skwiki.update({
        _id : req.params.skwiki_id
    },{$set:{text: req.body.text}}, function(err, skwi) {
        if (err)
            res.send(err);

        // get and return all the skwikis after you create another
        skwiki.find({}, function(err, skwikis) {
            if (err)
                res.send(err)
            res.json({skwikis: skwikis, editedSkwiki: req.body});
        });
    });
};
routes.home = function(req, res) {
    // res.sendfile(__dirname + '../public/Skeleton/index.html');
    res.sendFile('index.html', { root: path.join(__dirname, '../public/Skeleton') });
    //res.sendfile('../public/main.html'); // load the single view file (angular will handle the page changes on the front-end)
};


module.exports = routes;