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

  describe('POST api/v1/group/:groupID/message', () => {
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .post('/api/v1/group/1/message')
        .send({
          message: 'Hi guyz',
          priority: 'Critical'
        })
        .end((err, res) => {
          res.should.have.status(412);
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
          res.body.message.should.be.eql('Invalid group id');
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
          done();
        });
    });
  });

  describe('GET api/v1/group/:groupID/messages', () => {
    it('should produce all messages in a valid group', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('messages');
          res.body.messages[0].postedby.should.be.eql('existing');
          res.body.messages[0].message.should.be.eql('Hello guyz');
          res.body.messages[0].priority.should.be.eql('Critical');
          done();
        });
    });
    it('should respond with an error message if incorrect groupId is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/ghhjgdhskfjgf/messages')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id must be integer');
          done();
        });
    });
    it('should respond with an error message if invalid groupId is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/10/messages')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id');
          done();
        });
    });
    it('should respond with an error message if groupId is not supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/ /messages')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('groupID cannot be empty');
          done();
        });
    });
    it('should respond with an error message if token is not supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .end((err, res) => {
          res.should.have.status(412);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Your login token must be provided');
          done();
        });
    });
    it('should respond with an error message if invalid token is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/messages')
        .set('token', 'invalidToken')
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
