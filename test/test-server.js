//process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('Scrapers', function() {
	it('Parse the HTML for OG tags /urlForScraping POST', function(done) {
		chai.request(server)
		.post('/urlForScraping')
		.send({'url':'http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai'})
		.end(function(err, res){
			if (err) {
				console.log("error");
				done(err);
			} else {
				res.should.have.status(200);
				res.should.be.json;
				res.body.should.be.a('object');
				done();
			}
		});
	});
});
