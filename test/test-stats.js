const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should(); 
chai.use(chaiHttp);

describe('Stats', function() {

 it('should 200 on GET requests', function() {
   return chai.request('http://localhost:8080')
    .get('/api/stats/personal-stats')
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
    })
	});
});