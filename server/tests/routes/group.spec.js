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
    it('should respond with an error message if empty groupname is supplied',
      (done) => {
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
    it('should respond with an error message if groupname is not supplied',
      (done) => {
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
    it('should respond with an error message if token is not supplied',
      (done) => {
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
    it('should respond with an error message if user is not logged in',
      (done) => {
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
    it('should respond with an error message if the groupName is already existing',
      (done) => {
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
            res.body.message.should.be.eql(
              'There is already an existing group with this name');
            done();
          });
      });
    it('should respond with a success message if correct details are supplied',
      (done) => {
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

  describe('DELETE /api/v1/group/:groupId', () => {
    it('should respond with an error message if token is not defined',
      (done) => {
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
    it('should respond with an error message if the supplied groupId is not an integer',
      (done) => {
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
    it('should respond with an error message if the supplied groupId does not exist',
      (done) => {
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
    it('should respond with an error message if invalid token is supplied',
      (done) => {
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
  });

  describe('GET api/group/:groupId/messages', () => {
    it('should respond with an error message if groupId does not exist',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/100/messages')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Group does not exist');
            done();
          });
      });
    it('should respond with a success message if correct groupId is supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/3/messages')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('messages');
            res.body.messages[0].message.should.be.eql('new msg');
            res.body.messages[0].postedby.should.be.eql('mrNoName');
            done();
          });
      });
  });

  describe('POST api/v1/group/:groupId/message', () => {
    it('should respond with an error message if token is not defined',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/message')
          .send({
            content: 'Hi guyz',
            priority: 'Critical'
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Your login token must be provided');
            done();
          });
      });
    it('should respond with an error message if message content is not defined',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/message')
          .send({
            token: sentToken,
            priority: 'Critical'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('content must be supplied');
            done();
          });
      });
    it('should respond with an error message if groupId is empty', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /message')
        .send({
          content: 'Hi guyz',
          token: sentToken,
          priority: 'Critical'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('groupId cannot be empty');
          done();
        });
    });
    it('should respond with an error message if token is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          content: 'Hi guyz',
          token: 'incorrectToken',
          priority: 'Critical'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login');
          done();
        });
    });
    it('should respond with an error message if the groupId does not exist',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/17539649/message')
          .send({
            content: 'Hi guyz',
            token: sentToken,
            priority: 'Normal'
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Group does not exist');
            done();
          });
      });
    it('should respond with an error message if non-integer is supplied as groupId',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/afggheg/message')
          .send({
            content: 'Hi guyz',
            token: sentToken,
            priority: 'Normal'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'The supplied id must be an integer');
            done();
          });
      });
    it('should respond with an error message if message is empty', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          content: '',
          token: sentToken,
          priority: 'Urgent'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('message cannot be empty');
          done();
        });
    });
    it('should respond with an error message if wrong priority is specified',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/message')
          .send({
            content: 'Hi guyz',
            token: sentToken,
            priority: 'Immediate'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'Priority can either be Normal, Urgent or Critical');
            done();
          });
      });
    it('should respond with a success message if correct details are supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/6/message')
          .send({
            content: 'Hello guyz',
            token: sentToken,
            priority: 'Critical'
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Message posted successfully');
            res.body.Message.message.should.be.eql('Hello guyz');
            res.body.Message.priority.should.be.eql('Critical');
            done();
          });
      });
  });

  describe('POST api/v1/group/:groupId/message/archive', () => {
    it('should return an error message if messageIds is not an array',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/:groupId/message/archive')
          .send({
            groupId: 5,
            messageIds: 4,
            userId: 1,
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'Please supply an array for messageIds');
            done();
          });
      });
    it('should return an error message if messageIds is not an array',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/2/message/archive')
          .send({
            messageIds: [4],
            userId: 1,
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('read messages added');
            done();
          });
      });
  });

  describe('POST api/v1/group/:groupId/user', () => {
    it('should respond with a success message if correct details are supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .send({
            userId: [1],
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('User successfully added');
            res.body.should.have.property('user');
            res.body.user.groupId.should.be.eql(1);
            res.body.user.userId.should.be.eql(1);
            done();
          });
      });
    it('should respond with an error message if incorrect group id is used',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1464878/user')
          .send({
            userId: [1],
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Invalid group id supplied');
            done();
          });
      });
    it('should respond with an error message if invalid group id is used',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/14hjgjdkskb/user')
          .send({
            userId: [1],
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'The supplied id\'s must be integers');
            done();
          });
      });
    it('should respond with an error message if userId is not defined', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('userId\'s must be supplied');
          done();
        });
    });
    it('should respond with an error message if token is not defined',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .send({
            userId: [1]
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Your login token must be provided');
            done();
          });
      });
    it('should respond with an error message if invalid token is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .send({
            userId: [1],
            token: 'invalid'
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Access denied!. Kindly login');
            done();
          });
      });
    it('should respond with an error message if userId is empty', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/user')
        .send({
          userId: [],
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('userId\'s cannot be empty');
          done();
        });
    });
    it('should respond with an error message if groupId is empty', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /user')
        .send({
          userId: [1],
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('groupId cannot be empty');
          done();
        });
    });
    it('should respond with an error message if user is already in the group',
      (done) => {
        chai.request(app)
          .post('/api/v1/group/1/user')
          .send({
            userId: [1],
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('User already in the group');
            done();
          });
      });
  });

  describe('GET api/group/:groupId/user', () => {
    it('should respond with a success message if correct details are supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/1/users')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('users');
            res.body.users[0].username.should.be.eql('existing');
            res.body.users[0].email.should.be.eql('existing@gmail.com');
            done();
          });
      });
    it('should respond with an error message if incorrect groupId is supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/1537625/users')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('The specified group does not exist');
            done();
          });
      });
    it('should respond with an error message if login token is not defined',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/1/users')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Your login token must be provided');
            done();
          });
      });
    it('should respond with an error message if incorrect login token is supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/group/1/users')
          .set('token', 'incorrectToken')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Access denied!. Kindly login');
            done();
          });
      });
  });
});
