import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../../server';

chai.use(chaiHttp);
const should = chai.should();
let sentToken = '';
describe('PostIt Endpoints', () => {
  describe('POST api/v1/user/signin', () => {
    it('should log a user in, to get login token', (done) => {
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
          res.should.have.status(412);
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
          res.should.have.status(412);
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
    it('should respond with error message if the supplied groupID is not valid', (done) => {
      chai.request(app)
        .delete('/api/v1/group/12776283')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id');
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
});
