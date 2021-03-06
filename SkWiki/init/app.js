//Useful server-side libraries/packages
var express = require('express');//express makes an app object
var path = require('path'); //path allows the creation of paths (with /) from individual names
var cookieParser = require('cookie-parser'); //lets server access cookies
var bodyParser = require('body-parser'); //lets server access req.body
var exphbs = require('express-handlebars'); //lets you use handlebars
var mongoose = require('mongoose'); //javascript wrapper for mongo; lets you use database
var logger = require('morgan');             // log requests to the console (express4) /debugging tool
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//Main page routes
var skwiki = require('./routes/skwiki');

var app = express(); //initialize app object


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());   // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cookieParser());

//Routing: directing requests to render stuff ("API spec")
app.get('/skwikis', skwiki.getLinks);
app.get('/searchSkwiki', skwiki.searchSkwiki);
app.delete("/skwiki/:skwiki_id", skwiki.deleteSkwiki);

//Subroutes (page changes w/out refresh) fill in by page
app.post('/addSkwiki', skwiki.addSkwiki);
app.post('/editSkwiki/:skwiki_id', skwiki.editSkwiki);

//apply to all pages
app.get("*", skwiki.home);

//Choose a location from which the app is accessed
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});