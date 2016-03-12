//Useful server-side libraries/packages
//ask google about npm ___ to learn more
var express = require('express');//express makes an app object
var path = require('path'); //path allows the creation of paths (with /) from individual names
var favicon = require('serve-favicon'); //the little picture on the tab
var logger = require('morgan'); //debugging tool
var cookieParser = require('cookie-parser'); //lets server access cookies
var bodyParser = require('body-parser'); //lets server access req.body
var exphbs = require('express-handlebars'); //lets you use handlebars
var mongoose = require('mongoose'); //javascript wrapper for mongo; lets you use database
var session = require('express-session');


//Main page routes
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');

var app = express(); //initialize app object

mongoose.connect('mongodb://localhost/test'); //connect to mongo database

// view engine setup
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Middleware: happens before the request gets to the routes and must happen in order
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'this is not a secret ;)',
  resave: false,
  saveUninitialized: false }));

//Routing: directing requests to render stuff ("API spec")
app.get('/', index.homePage);
app.get('/login', login.loginPage)


//Subroutes (page changes w/out refresh) fill in by page
//ex. app.post('/addIngredient', ingredients.addIngredient);
app.post('/addTwote', index.addTwote);
app.post('/logIn', login.logIn);
app.post('/logOut', logout.logOut);
app.post('/eraseTwote', index.eraseTwote);

//Choose a location from which the app is accessed
var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
