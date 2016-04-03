/*
Here's an example of another kind of test you might have been able to write --
save something to database, then remove it.

Tests are supposed to "clean up after themselves" -- in this case, leave the database unmodified.
Usually that means you'll see an it(...) for adding an object at the beginning of the describe(...)
and an it(...) for removing the same object at the end. (in this case there aren't any other tests
in between, but you can imagine what they could be).

One more kind of an interesting point (not particularly relevant at this point) -- whatever dummy object
you create to test your database save/remove should be as unique as possible, so you don't accidentally
conflict with existing objects in the database. For example: if you were testing your burger app and you
saved a test ingredient to your database with the name "Cheese", then you removed all ingredient documents
with the name "Cheese" from your database, you might remove more than the test ingredient -- because there
very well might have already been an ingredient named "Cheese" in there.

Fortunately it doesn't really matter whether the name of the ingredient you're trying to save makes
semantic sense in the context of a burger restaurant or not... so, here's what I've seen people do
in cases like this: come up with some long, fairly-likely-to-be-unique string using the current
unix epoch time, or a random number generator, or both combined. Not a big deal in this context,
but safer in production.

Ok, on to the test...
(I haven't tried running it on your app -- just a framework you could fill in if you wanted to)


require('./../../../app');
var expect = require('chai').expect;
var mongoose = require('mongoose');

var Twote = require('./../../../models/twoteModel');

describe('Twote Model', function() {

 	 it('should create a new twote', function(done) {

 		var twote = new Twote({
 			// ... your twote data
 		});

 		twote.save(function(err){
 			if (err){
 				return done(err);
 			}
 			done();
 		});
 	});

	it('should remove the newly-added twote', function(done) {
		var query = // some identifying Mongoose query
 		Twote.findOneAndRemove(query, function(err,removed) {
 			if (err) {
 				return done(err);
 			}
 			done();
 		});
	});
});

*/
