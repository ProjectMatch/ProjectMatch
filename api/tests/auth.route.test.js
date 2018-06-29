const MongoClient = require('mongodb').MongoClient;
const app = require('../server');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Authenticaiton Routes', function() {
  const agent = chai.request.agent(app);

  before(function(done) {
    MongoClient.connect(
      'mongodb://localhost:27017',
      { useNewUrlParser: true },
      function(err, client) {
        const db = client.db('project-match-test');
        db
          .collection('users')
          .deleteMany({})
          .then(err => client.close(done));
      }
    );
  });

  after(function(done) {
    agent.close(done);
  });

  it('should sign up user', function(done) {
    agent
      .post('/api/auth/signup')
      .send({
        username: 'blackpanther',
        password: 'tigercheese12',
        email: 'tchalla@wakanda.gov',
        firstName: 'tchalla',
        lastName: 'unknown'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Successfully signed up.');
        done();
      });
  });

  it('should logout user', function(done) {
    agent.get('/api/auth/logout').end(function(err, res) {
      expect(res).to.have.status(200);
      expect(res.body.message).to.equal('Successfully logged out.');
      done();
    });
  });

  it('should not login user', function(done) {
    agent
      .post('/api/auth/login')
      .send({
        username: 'blackpanther',
        password: 'tigercheese123'
      })
      .end(function(err, res) {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(undefined);
        done();
      });
  });

  it('should login user', function(done) {
    agent
      .post('/api/auth/login')
      .send({
        username: 'blackpanther',
        password: 'tigercheese12'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Successfully logged in.');
        done();
      });
  });
});
