var express = require('express');
var router = express.Router();
var skwik = require('../models/skwikiSchema');
var path = require('path'); //path allows the creation of paths (with /) from individual names

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/skwiki");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

var skwiki = {};


    skwiki.getLinks = function(req, res) {

        // use mongoose to get all todos in the database
        skwik.find(function(err, skwikis) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
            res.json(skwikis.title);
//return skwiki titles for listing
        });
    };

    skwiki.getSkwiki = function(req, res) {

        // use mongoose to get all todos in the database
        skwik.findOne({_id: req.params.todo_id}, function(err, skwikis) {

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

    // create todo and send back all todos after creation
   skwiki.addSkwiki = function(req, res) {

        // create a skwiki, information comes from AJAX request from Angular
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
    skwiki.deleteSkwiki = function(req, res) {
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


    skwiki.editSkwiki = function(req, res) {
        skwiki.update({
            _id : req.params.skwiki_id
        },{$set:{text: req.body.text}}, function(err, skwik) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            skwiki.find(function(err, skwikis) {
                if (err)
                    res.send(err)
                res.json(skwikis);
            });
        });
    };

    skwiki.home = function(req, res) {
        // res.sendfile(__dirname + '../public/Skeleton/index.html');
        res.sendFile('index.html', { root: path.join(__dirname, '../public/Skeleton') });
        //res.sendfile('../public/main.html'); // load the single view file (angular will handle the page changes on the front-end)
    };


module.exports = skwiki;