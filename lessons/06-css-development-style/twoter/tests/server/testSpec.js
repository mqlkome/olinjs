var expect = require('chai').expect;
var request = require('supertest');
var app = require('./../../app.js');
var index = require('../../routes/index');


describe("The app", function() {
  it('should return 200 OK on GET /', function(done) {
	request(app)
	  .get('/')
	  .expect(200)
	  .end(function (err, res) {
	  	if(err){return done(err);
	    }
	    done();
	  });
  });

  it('should return 200 OK on GET /login', function(done) {
	request(app)
	  .get('/login')
	  .expect(200)
	  .end(function (err, res) {
	  	if(err){return done(err);
	    }
	    done();
	  });
  });

  it('should logIn existing/new users and return 200 OK on post /logIn', function(done) {
		var user = {username: "mimi"}

		request(app)
	  .post('/logIn')
	  .send(user)
	  .expect(200)
	  .end(function(err, res) {
	  	done(); // The done belongs either here, in the end...
	  })
  });
	it('should should error on post /logIn with an invalid user object', function(done) {
		var user = {}

		request(app)
	  .post('/logIn')
	  .send(user)
	  .expect(302, done); // or here, as a callback for the last expect
	  // For some reason I get a 200 instead of a 500 when I move the done?
	  // Maybe worth investingating... is an empty user object ok with your server after all?
  });

  it('should something on post /logOut', function(done){ // Callback function belongs inside the it parentheses
  	request(app)
  	.post('/logOut')
  	.expect(302, done); // For some reason I get a 302 when I fix the callback -- do you know why?
  });

// // use supertest-session library to create fake session information
//   it('should something on post /eraseTwote'), function(done){

//   };
//   it('should error with invalid user on post /addTwote'), function(done){

//   };
});
