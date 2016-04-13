var express = require('express');
var router = express.Router();
var skwiki = require('../models/skwikiSchema');
var path = require('path'); //path allows the creation of paths (with /) from individual names

var mongoose = require('mongoose');
mongoose.connect(process.env.PROD_MONGODB||"mongodb://localhost/skwiki");


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

var routes = {};
//All of the routes for the Skwiki. Adds all database integration and data manipulation/sorting

//Gets the list of all entries in the database
routes.getLinks = function(req, res) {
    // use mongoose to get all Skwikis in the database
    skwiki.find(function(err, skwikis) {
        console.log(skwikis);
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)
        res.json(skwikis);  //return skwiki titles for listing
    });
};

//Good Idea to use angular filter, but why is it a bad idea to do search on the server instead?
//Unused potential search bar functionality (chose to use Angular's filter instead)
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
			var patt = new RegExp(req.body.search);
			var res = patt.exec(str);
			if (res != null) {
				returnSkwikis.push(skwikis[i])
			} 
    	}
    	res.json(returnSkwikis)
});
}

// create skwiki and send back all todos after creation
routes.addSkwiki = function(req, res) {
    // create a skwiki, information comes from AJAX request from Angular
    console.log(req.body)
    // make sure to validate the title and text before creating.
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

// delete a skwiki
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

//edits a skwiki
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

//home route
routes.home = function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, '../public/Skeleton') });
};

module.exports = routes;
