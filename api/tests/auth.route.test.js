const MongoClient = require('mongodb').MongoClient;
const app = require('../server');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Authentication Routes', function() {
  const agent = chai.request.agent(app);

  const dbConfig = {
    url: 'mongodb://localhost:27017',
    name: 'project-match-test'
  };

  const user = {
    username: 'blackpanther',
    password: 'tigercheese12',
    email: 'tchalla@wakanda.gov',
    firstName: 'tchalla',
    lastName: 'unknown'
  };

  before(function(done) {
    MongoClient.connect(dbConfig.url, { useNewUrlParser: true }, function(
      err,
      client
    ) {
      const db = client.db(dbConfig.name);
      db
        .collection('users')
        .deleteMany({})
        .then(err => client.close(done));
    });
  });

  after(function(done) {
    agent.close(done);
  });

  it('should sign up user', function(done) {
    agent
      .post('/api/auth/signup')
      .send(user)
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

  it('should not sign up user with username taken', function(done) {
    agent
      .post('/api/auth/signup')
      .send(user)
      .end(function(err, res) {
        expect(res).to.have.status(409);
        expect(res.body.message).to.equal(
          'User already exists with this email or username.'
        );
        done();
      });
  });

  it('should not login user with incorrect credentials', function(done) {
    const wrongPassword = 'this is so wrong';

    agent
      .post('/api/auth/login')
      .send({
        username: user.username,
        password: wrongPassword
      })
      .end(function(err, res) {
        expect(res).to.have.status(401);
        expect(res.body.message).to.equal(undefined);
        done();
      });
  });

  it('should login user with proper credentials', function(done) {
    agent
      .post('/api/auth/login')
      .send({
        username: user.username,
        password: user.password
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equal('Successfully logged in.');
        done();
      });
  });
});
