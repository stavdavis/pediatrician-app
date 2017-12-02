const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// const {app, runServer, closeServer} = require('../server');
const {app} = require('../server');

chai.use(chaiHttp);

describe('Simple startup confirmation test for index page', function() {
  it('should confirm index page exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
});