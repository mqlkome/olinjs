var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');

var index = require('./routes/index');
var ingredients = require('./routes/ingredients')
var order = require('./routes/order')
var kitchen = require('./routes/kitchen')

var app = express();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test');

// view engine setup
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', index.homePage);
app.get('/ingredients', index.ingredientsPage);
app.get('/order', index.orderPage);
app.get('/kitchen', index.kitchenPage);

//Ingredients Subroutes
app.post('/addIngredient', ingredients.addIngredient)
app.post('/editIngredient', ingredients.editIngredient)
app.post('/oosIngredient', ingredients.oosIngredient)

//Order Subroutes
app.post('/submitOrder', order.submitOrder)

//Kitchen Subroutes
app.post('/finishOrder', kitchen.finishOrder)

var PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("Application running on port: ", PORT);
});
