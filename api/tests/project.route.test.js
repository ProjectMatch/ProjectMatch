const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const app = require('../server');

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('Project Routes', function() {
  const agent = chai.request.agent(app);

  const dbConfig = {
    url: 'mongodb://localhost:27017',
    name: 'project-match-test'
  };

  const fakeUser1 = {
    firstName: 'Tony',
    lastName: 'Luo',
    username: 'luoto',
    email: 'tony@gmail.com',
    profileImage: 'profile.com/tony'
  };

  const fakeUser2 = {
    username: 'blackpanther',
    password: 'tigercheese12',
    email: 'tchalla@wakanda.gov',
    firstName: 'tchalla',
    lastName: 'unknown'
  };

  const fakeProject1 = {
    _id: ObjectID('5b353f6c3e61d8b82bd3784e'),
    name: 'Project Match',
    creator: 'luoto',
    githubLink: 'https://github.com',
    mockupLink: 'https://notreal.me/mockup',
    liveLink: 'https://notreal.me',
    images: '',
    team: '',
    description: 'Matching Programmers and Designers',
    contact: 'help@notreal.me',
    lookingFor: 'none',
    category: 'portal',
    status: 'true'
  };

  const fakeProject2 = {
    _id: ObjectID('5b353f6c3e61d8b82bd37843'),
    name: 'Project Match2',
    creator: 'luoto',
    githubLink: 'https://github.com',
    mockupLink: 'https://fake.in',
    liveLink: 'https://fake.in',
    images: '',
    team: '',
    description: 'Writing all day long',
    contact: 'service@fake.in',
    lookingFor: 'none',
    category: 'portal',
    status: 'true'
  };

  const fakeProject3 = {
    name: 'Travelers United',
    githubLink: 'https://github.com',
    mockupLink: 'https://travel.me',
    liveLink: 'https://travel.me',
    images: '',
    team: '',
    description: 'Doing amazing things',
    contact: 'tony@travel.me',
    lookingFor: 'none',
    category: 'portal',
    status: 'true'
  };

  const fakeProject4 = {
    name: 'Secret Spy Service',
    creator: 'luoto',
    githubLink: 'https://github.com',
    mockupLink: 'https://find.me',
    liveLink: 'https://find.me',
    images: '',
    team: '',
    description: 'Travel the world looking for people',
    contact: 'agent@find.me',
    lookingFor: 'none',
    category: 'job',
    status: 'true'
  };

  const fakeRevision1 = {
    revisionNumber: '1',
    finalVersion: false,
    imageURL: '',
    createdAt: Date.now(),
    creator: 'luoto',
    markers: {},
    project: {},
    description: ''
  };

  const fakeComment1 = {
    project: ObjectID('5b353f6c3e61d8b82bd3784e'),
    marker: {},
    creator: 'luoto',
    comment: 'hello',
    createdAt: Date.now()
  };

  let revisionId;
  let markerId;
  let projectId;

  before(function(done) {
    MongoClient.connect(dbConfig.url, { useNewUrlParser: true }, function(
      err,
      client
    ) {
      const db = client.db(dbConfig.name);

      db
        .collection('users')
        .deleteMany({})
        .then(err => db.collection('projects').deleteMany())
        .then(err => db.collection('revisions').deleteMany({}))
        .then(err => db.collection('comments').deleteMany({}))
        .then(err => db.collection('markers').deleteMany({}))
        .then(err => {
          return db.collection('users').insertMany([fakeUser1]);
        })
        .then(err => {
          return db
            .collection('projects')
            .insertMany([fakeProject1, fakeProject2]);
        })
        .then(() => {
          return db.collection('revisions').insertMany([fakeRevision1]);
        })
        .then(() => {
          return db.collection('comments').insertMany([fakeComment1]);
        })
        .then(() => client.close(done))
        .catch(err => console.log(err));
    });
  });

  after(function(done) {
    agent.close(done);
  });

  describe('Authenticated Actions', function() {
    context('Sign up', function() {
      it('should sign up user', function(done) {
        agent
          .post('/api/auth/signup')
          .send(fakeUser2)
          .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body.message).to.equal('Successfully signed up.');
            done();
          });
      });
    });

    context('Projects CRUD', function() {
      it('should post project when authenticated', function(done) {
        agent
          .post('/api/projects')
          .send(fakeProject3)
          .end(function(err, res) {
            const newProject = res.body.newProject;
            projectId = newProject._id;
            expect(newProject)
              .to.have.property('name')
              .to.equal(fakeProject3.name);
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should update a project', function(done) {
        const update = {
          lookingFor: 'developers',
          category: 'featured'
        };

        agent
          .put(`/api/projects/${projectId}`)
          .send(update)
          .end(function(err, res) {
            const project = res.body.project;

            expect(project)
              .to.have.property('name')
              .to.equal(fakeProject3.name);
            expect(project)
              .to.have.property('lookingFor')
              .to.have.length(1);
            expect(project)
              .to.have.property('category')
              .to.equal(update.category);
            expect(res).to.have.status(200);
            done();
          });
      });

      it('should delete a project', function(done) {
        const del = {
          id: fakeProject2._id
        };

        agent
          .delete('/api/projects')
          .send(del)
          .end(function(err, res) {
            const project = res.body.project;
            expect(project)
              .to.have.property('name')
              .to.equal('Project Match2');
            done();
          });
      });

      it('should get all projects', function(done) {
        agent.get('/api/projects/').end(function(err, res) {
          const projects = res.body.projects;
          const message = res.body.message;

          const project = projects.docs[0];

          expect(message).to.equal('Success!');
          expect(projects).to.have.property('docs');
          expect(projects.docs).to.have.length(2);
          expect(project)
            .to.have.property('creator')
            .to.equal('luoto');

          done();
        });
      });

      it('should get a single project', function(done) {
        agent.get(`/api/projects/${fakeProject1._id}`).end(function(err, res) {
          const project = res.body.project;

          expect(project)
            .to.have.property('creator')
            .to.equal(fakeProject1.creator);

          done();
        });
      });
    });

    context('Teams CRUD', function() {
      it('should get team for project', function(done) {
        agent
          .get(`/api/projects/${fakeProject1._id}/team`)
          .end(function(err, res) {
            const team = res.body.team;

            expect(team).to.contain(fakeProject1.creator);

            done();
          });
      });

      it('should get team thumbnails', function(done) {
        agent
          .get(`/api/projects/${fakeProject1._id}/team/thumbnails`)
          .end(function(err, res) {
            const url = res.body.thumbnailURLs;

            expect(url).to.contain(fakeUser1.profileImage);

            done();
          });
      });
    });

    context('Comments CRUD', function() {
      it('should post comment to a project', function(done) {
        const post = {
          message: 'hello from BP'
        };
        agent
          .post(`/api/projects/${fakeProject1._id}/comment`)
          .send(post)
          .end(function(err, res) {
            const comment = res.body.comment;
            expect(comment)
              .to.have.property('creator')
              .to.equal(fakeUser2.username);
            done();
          });
      });

      it('should get comments of a project', function(done) {
        agent
          .get(`/api/projects/${fakeProject1._id}/comments`)
          .end(function(err, res) {
            const comments = res.body.comments;
            expect(comments[0])
              .to.have.property('creator')
              .to.equal(fakeUser1.username);
            expect(comments[0])
              .to.have.property('comment')
              .to.equal('hello');
            done();
          });
      });
    });

    context('Revisions CRUD', function() {
      it('should post a revision to a project', function(done) {
        const post = {
          revisionNumber: 1,
          imageURL: 'revisionurl.com',
          description: 'myRevision'
        };
        agent
          .post(`/api/projects/${fakeProject1._id}/revision`)
          .send(post)
          .end(function(err, res) {
            const revision = res.body.revision;
            revisionId = revision._id;
            expect(revision)
              .to.have.property('creator')
              .to.equal(fakeUser2.username);
            expect(revision)
              .to.have.property('description')
              .to.equal(post.description);
            done();
          });
      });

      it('should get revisions for a project', function(done) {
        agent
          .get(`/api/projects/${fakeProject1._id}/revisions`)
          .end(function(err, res) {
            const revisions = res.body.revisions;
            expect(revisions[0])
              .to.have.property('creator')
              .to.equal(fakeUser2.username);
            expect(revisions[0])
              .to.have.property('imageURL')
              .to.equal('revisionurl.com');
            done();
          });
      });

      it('should get revisions for a project', function(done) {
        agent
          .get(`/api/projects/revision/${revisionId}`)
          .end(function(err, res) {
            const revision = res.body.revision;
            expect(revision)
              .to.have.property('creator')
              .to.equal(fakeUser2.username);
            expect(revision)
              .to.have.property('imageURL')
              .to.equal('revisionurl.com');
            done();
          });
      });
    });

    context('Markers CRUD', function() {
      it('should post marker to a revision', function(done) {
        const post = {
          type: 'circle',
          x: 32,
          y: 65,
          width: 50,
          height: 50,
          isResolved: false
        };

        agent
          .post(`/api/projects/revision/${revisionId}/marker`)
          .send(post)
          .end(function(err, res) {
            const marker = res.body.marker;
            markerId = marker._id;
            expect(marker)
              .to.have.property('type')
              .to.equal(post.type);
            expect(marker)
              .to.have.property('x')
              .to.equal(post.x);
            done();
          });
      });

      it('should update marker', function(done) {
        const post = {
          x: 40
        };

        agent
          .put(`/api/projects/revision/marker/${markerId}`)
          .send(post)
          .end(function(err, res) {
            const marker = res.body.marker;
            expect(marker)
              .to.have.property('x')
              .to.equal(post.x);
            expect(marker)
              .to.have.property('y')
              .to.equal(65);
            done();
          });
      });

      it('should get markers for a revision', function(done) {
        agent
          .get(`/api/projects/revision/${revisionId}/markers`)
          .end(function(err, res) {
            const markers = res.body.markers;
            expect(markers).to.have.length(1);
            done();
          });
      });

      it('should delete marker', function(done) {
        agent
          .delete(`/api/projects/revision/marker/${markerId}`)
          .end(function(err, res) {
            const marker = res.body.marker;
            expect(marker)
              .to.have.property('type')
              .to.equal('circle');
            expect(marker)
              .to.have.property('x')
              .to.equal(40);
            done();
          });
      });

      it('should get markers for a revision', function(done) {
        agent
          .get(`/api/projects/revision/${revisionId}/markers`)
          .end(function(err, res) {
            const markers = res.body.markers;
            expect(markers).to.have.length(0);
            done();
          });
      });

      // FIXME: SHOULD FAIL (marker does not exist)
      it('should post a comment to a marker', function(done) {
        const post = {
          comment: 'this comment belongs on a marker'
        };

        agent
          .post(`/api/projects/revision/marker/${markerId}/comment`)
          .send(post)
          .end(function(err, res) {
            const comment = res.body.comment;
            expect(comment)
              .to.have.property('comment')
              .to.equal(post.comment);
            expect(comment)
              .to.have.property('creator')
              .to.equal(fakeUser2.username);
            done();
          });
      });

      it('should get comments for a marker', function(done) {
        agent
          .get(`/api/projects/revision/marker/${markerId}/comments`)
          .end(function(err, res) {
            const comments = res.body.comments;
            expect(comments).to.have.length(1);
            expect(comments[0])
              .to.have.property('creator')
              .to.equal(fakeUser2.username);
            done();
          });
      });
    });
  });

  describe('Unauthenticated Actions', function() {
    const agent = chai.request.agent(app);

    let revisionId;
    let markerId;
    let projectId;

    after('closing agent for CRUD - UNauthenticated', function(done) {
      agent.close(done);
    });

    context('Projects CRUD', function() {
      it('should not add project when unauthenticated', function(done) {
        agent
          .post('/api/projects/')
          .send(fakeProject4)
          .end(function(err, res) {
            expect(res).to.have.status(401);
            done();
          });
      });
    });
  });
});
