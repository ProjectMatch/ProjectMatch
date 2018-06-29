const app = require('../server');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Routes that do not exist', function() {
  const agent = chai.request.agent(app);

  context('/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/projects/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/projects/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/auth/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/auth/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/category/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/category/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/download/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/download/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/email/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/email/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/image/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/image/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/password/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/password/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/tag/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/tag/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/upload/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/upload/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  context('/api/user/does/not/exist', function() {
    it('should return 404', function(done) {
      agent.get('/api/user/does/not/exist').end(function(err, res) {
        expect(res).to.have.status(404);
        done();
      });
    });
  });
});
