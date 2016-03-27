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
	  done();
  });
	it('should should error on post /logIn with an invalid user object', function(done) {
		var user = {}

		request(app)
	  .post('/logIn')
	  .send(user)
	  .expect(500)
	  done();
  });

  it('should something on post /logOut'), function(done){
  	request(app)
  	.post('logOut')
  	.expect(200)
  	done();
  };

// // use supertest-session library to create fake session information  
//   it('should something on post /eraseTwote'), function(done){

//   };
//   it('should error with invalid user on post /addTwote'), function(done){
  	 
//   }; 
});
