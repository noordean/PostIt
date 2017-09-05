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
  describe('POST api/v1/group/:groupID/message', () => {
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          message: 'Hi guyz',
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
    it('should respond with error message if message is not defined', (done) => {
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
          res.body.message.should.be.eql('message must be supplied');
          done();
        });
    });
    it('should respond with error message if groupID is empty', (done) => {
      chai.request(app)
        .post('/api/v1/group/ /message')
        .send({
          message: 'Hi guyz',
          token: sentToken,
          priority: 'Critical'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('groupID cannot be empty');
          done();
        });
    });
    it('should respond with error message if token is incorrect', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          message: 'Hi guyz',
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
    it('should respond with error message if id is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/group/17539649/message')
        .send({
          message: 'Hi guyz',
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
    it('should respond with error message if non-integer is supplied as groupID', (done) => {
      chai.request(app)
        .post('/api/v1/group/afggheg/message')
        .send({
          message: 'Hi guyz',
          token: sentToken,
          priority: 'Normal'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id must be an integer');
          done();
        });
    });
    it('should respond with error message if message is empty', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          message: '',
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
    it('should respond with error message if wrong priority is specified', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          message: 'Hi guyz',
          token: sentToken,
          priority: 'Immediate'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Priority can either be Normal, Urgent or Critical');
          done();
        });
    });
    it('should respond with success message if correct details are supplied', (done) => {
      chai.request(app)
        .post('/api/v1/group/6/message')
        .send({
          message: 'Hello guyz',
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

  describe('POST api/v1/user/notification', () => {
    it('should return an error message if array is not supplied as userId', (done) => {
      chai.request(app)
        .post('/api/v1/user/notification')
        .send({
          userId: 3,
          groupName: 'test',
          message: 'hello here',
          postedby: 'noordean'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to supply an array for userId');
          done();
        });
    });
    it('should save notification into database if correct details are supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/notification')
        .send({
          userId: [3, 4],
          groupName: 'test',
          message: 'hello here',
          postedby: 'noordean'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('notification saved');
          done();
        });
    });
  });

  describe('GET api/v1/user/:userId/notification', () => {
    it('should return notifications if correct details are supplied', (done) => {
      chai.request(app)
        .get('/api/v1/user/1/notification')
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('notifications');
          res.body.notifications[0].groupName.should.be.eql('from Seeders');
          res.body.notifications[0].message.should.be.eql('Hello guyz');
          done();
        });
    });
  });

  describe('DELETE api/v1/user/:userId/notification', () => {
    it('should return notifications if correct details are supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/user/1/notification')
        .send({})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Deleted successfully');
          done();
        });
    });
  });

  describe('DELETE api/message/:messageID', () => {
    it('should not have access to delete messagee if token is not supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/message/54678')
        .send({
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Your login token must be provided');
          done();
        });
    });
    it('should return error message if the is supplied is not found', (done) => {
      chai.request(app)
        .delete('/api/v1/message/54678')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid message id');
          done();
        });
    });
    it('should delete a message if correct messageId is supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/message/1')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.eql('message deleted');
          done();
        });
    });
  });

  describe('POST api/v1/group/:groupId/message/archive', () => {
    it('should return an error message if messageIds is not an array', (done) => {
      chai.request(app)
        .post('/api/v1/group/:groupId/message/archive')
        .send({
          groupId: 5,
          messageIds: 4,
          userId: 1
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Please supply an array for messageIds');
          done();
        });
    });
    it('should return an error message if messageIds is not an array', (done) => {
      chai.request(app)
        .post('/api/v1/group/2/message/archive')
        .send({
          messageIds: [4],
          userId: 1
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

  describe('POST api/v1/message/:messageId/user', () => {
    it('should return an error message if messageIds is not an array', (done) => {
      chai.request(app)
        .get('/api/v1/message/4/user?groupId=6')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('users');
          res.body.users[0].username.should.be.eql('existing');
          done();
        });
    });
  });
});
