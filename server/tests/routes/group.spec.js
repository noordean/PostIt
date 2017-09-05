import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../server';

chai.use(chaiHttp);
const should = chai.should();
let sentToken = '';
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send({
        username: 'existing',
        password: 'exist123'
      })
      .end((err, res) => {
        sentToken = res.body.user.token;
        done();
      });
  });
  describe('POST api/v1/group', () => {
    it('should respond with error message if empty groupname is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .send({
          token: sentToken,
          groupName: '',
          description: 'for test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('groupName cannot be empty');
          done();
        });
    });
    it('should respond with error message if groupname is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .send({
          token: sentToken,
          description: 'for test'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('groupName must be supplied');
          done();
        });
    });
    it('should respond with error message if token is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .send({
          description: 'for test'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Your login token must be provided');
          done();
        });
    });
    it('should respond with error message if user is not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .send({
          token: 'invalidToken',
          groupName: 'Invalid Group',
          description: 'for test'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login');
          done();
        });
    });
    it('should respond with error message if the groupName is already existing', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .send({
          token: sentToken,
          groupName: 'New Group',
          createdby: 'mrNoName',
          description: 'for test'
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('There is already an existing group with this name');
          done();
        });
    });
    it('should respond with success message if correct details are supplied', (done) => {
      chai.request(app)
        .post('/api/v1/group')
        .send({
          token: sentToken,
          groupName: 'Correct Group',
          description: 'for testing...'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.group.name.should.be.eql('Correct Group');
          res.body.group.description.should.be.eql('for testing...');
          res.body.message.should.be.eql('Group successfully created');
          done();
        });
    });
  });

  describe('DELETE /api/v1/group/:groupID', () => {
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .delete('/api/v1/group/3')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Your login token must be provided');
          done();
        });
    });
    it('should respond with error message if the supplied groupID is not an integer', (done) => {
      chai.request(app)
        .delete('/api/v1/group/ghf')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id must be integer');
          done();
        });
    });
    it('should respond with error message if the supplied groupID does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/group/12776283')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Group does not exist');
          done();
        });
    });
    it('should respond with error message if invalid token is supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/group/3')
        .send({
          token: 'invalidToken'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login');
          done();
        });
    });
    it('should respond with success message if correct details are supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/group/3')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Group deleted');
          done();
        });
    });
  });

  describe('GET api/user/:userID/groups', () => {
    it('should respond with error message if invalid id is defined', (done) => {
      chai.request(app)
        .get('/api/v1/user/14575893/groups?limit=6&offset=0')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid user id');
          done();
        });
    });
    it('should respond with success message if correct detail is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/user/2/groups?limit=6&offset=0')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('groups');
          res.body.groups.rows[0].id.should.be.eql(1);
          done();
        });
    });
  });
});
