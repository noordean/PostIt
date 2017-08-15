import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../server';

chai.use(chaiHttp);
const should = chai.should();
let sentToken = '';
describe('PostIt Endpoints', () => {
  describe('POST api/user/signup', () => {
    it('should respond with error message if invalid email is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'invalidEmail',
          password: 'invalid123',
          email: 'invalidEmail',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid email detected. Kindly supply a valid email');
          done();
        });
    });
    it('should respond with error message if incorrect password combination is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'incorrect',
          password: 'incorrectPassword',
          email: 'incorrect@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be alphanumeric and should contain 5-12 characters');
          done();
        });
    });
    it('should respond with error message if incorrect username combination is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'incorrect123',
          password: 'incorrect123',
          email: 'incorrect123@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Username should contain only letters and must have between 5-12 characters');
          done();
        });
    });
    it('should respond with error message if the supplied password is too short', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'shortUser',
          password: 'shot',
          email: 'shortUser@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be alphanumeric and should contain 5-12 characters');
          done();
        });
    });
    it('should respond with error message if the supplied username is too short', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'shot',
          password: 'short123',
          email: 'short@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Username should contain only letters and must have between 5-12 characters');
          done();
        });
    });
    it('should respond with error message if username is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          password: 'undefUser123',
          email: 'UndefinedUser@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('username cannot be null');
          done();
        });
    });
    it('should respond with error message if password is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'undefPass',
          email: 'undefPass@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be supplied');
          done();
        });
    });
    it('should respond with error message if email is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'undefEmail',
          password: 'undefMail123',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('email cannot be null');
          done();
        });
    });
    it('should respond with error message if user is already registered', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'existing',
          password: 'exist123',
          email: 'existing@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You already have an existing account. Kindly go and login');
          done();
        });
    });
    it('should respond with error message if phoneNumber is invalid', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send({
          username: 'invaPhone',
          password: 'invaPh123',
          email: 'invalidPhone@gmail.com',
          phoneNumber: '07098765HY'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Phone number should not contain letters and should be valid');
          done();
        });
    });
  });

  describe('POST api/user/signin', () => {
    it('should respond with error message if username is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send({
          password: 'undefUser1'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide username and password');
          done();
        });
    });
    it('should respond with error message if password is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send({
          username: 'undefUser'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide username and password');
          done();
        });
    });
    it('should respond with error message if invalid username is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send({
          username: 'INVALID',
          password: 'invaUser123'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid user!');
          done();
        });
    });
    it('should respond with success message if correct username and password are supplied', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send({
          username: 'existing',
          password: 'exist123'
        })
        .end((err, res) => {
          sentToken = res.body.token;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You are now logged in');
          done();
        });
    });
  });
  describe('POST api/group', () => {
    it('should respond with error message if empty groupname is supplied', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({
          token: sentToken,
          groupName: '',
          createdby: 'mrNoName',
          description: 'for test'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The group-name cannot be empty');
          done();
        });
    });
    it('should respond with error message if groupname is not supplied', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({
          token: sentToken,
          createdby: 'mrNoName',
          description: 'for test'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The group-name, description, and your logged-in token must be specified');
          done();
        });
    });
    it('should respond with error message if token is not supplied', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({
          createdby: 'mrNoName',
          description: 'for test'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The group-name, description, and your logged-in token must be specified');
          done();
        });
    });
    it('should respond with error message if user is not logged in', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({
          token: 'invalidToken',
          groupName: 'Invalid Group',
          createdby: 'mrNoName',
          description: 'for test'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login before creating group');
          done();
        });
    });
    it('should respond with error message if the groupName is already existing', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({
          token: sentToken,
          groupName: 'New Group',
          createdby: 'mrNoName',
          description: 'for test'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('There is already an existing group with this name');
          done();
        });
    });
  });

  describe('POST api/group/:groupID/user', () => {
    it('should respond with error message if incorrect group id is used', (done) => {
      chai.request(app)
        .post('/api/group/146447878/user')
        .send({
          userId: 1,
          token: sentToken
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id supplied');
          done();
        });
    });
    it('should respond with error message if invalid group id is used', (done) => {
      chai.request(app)
        .post('/api/group/14hjgjdkskb/user')
        .send({
          userId: 1,
          token: sentToken
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id\'s must be integers');
          done();
        });
    });
    it('should respond with error message if userId is not defined', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, your logged-in token and the userId');
          done();
        });
    });
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .post('/api/group/1/user')
        .send({
          userId: 1
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, your logged-in token and the userId');
          done();
        });
    });
  });

  describe('POST api/group/:groupID/message', () => {
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .send({
          message: 'Hi guyz',
          priority: 'Critical'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, priority, your logged-in token and the message');
          done();
        });
    });
    it('should respond with error message if message is not defined', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .send({
          token: sentToken,
          priority: 'Critical'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, priority, your logged-in token and the message');
          done();
        });
    });
    it('should respond with error message if groupID is empty', (done) => {
      chai.request(app)
        .post('/api/group/ /message')
        .send({
          message: 'Hi guyz',
          token: sentToken,
          priority: 'Critical'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('group-id or message cannot be empty');
          done();
        });
    });
    it('should respond with error message if token is incorrect', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .send({
          message: 'Hi guyz',
          token: 'incorrectToken',
          priority: 'Critical'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login before posting message');
          done();
        });
    });
    it('should respond with error message if id is invalid', (done) => {
      chai.request(app)
        .post('/api/group/17539649/message')
        .send({
          message: 'Hi guyz',
          token: sentToken,
          priority: 'Normal'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id');
          done();
        });
    });
    it('should respond with error message if message is empty', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .send({
          message: '',
          token: sentToken,
          Priority: 'Urgent'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, priority, your logged-in token and the message');
          done();
        });
    });
    it('should respond with error message if wrong priority is specified', (done) => {
      chai.request(app)
        .post('/api/group/1/message')
        .send({
          message: 'Hi guyz',
          token: sentToken,
          priority: 'Immediate'
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Priority can either be Normal, Urgent or Critical');
          done();
        });
    });
  });

  describe('GET api/group/:groupID/messages', () => {
    it('should produce all messages in a valid group', (done) => {
      chai.request(app)
        .get('/api/group/1/messages')
        .set('token', sentToken)
        .end((err, res) => {
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
        .get('/api/group/ghhjgdhskfjgf/messages')
        .set('token', sentToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id must be integer');
          done();
        });
    });
    it('should respond with an error message if invalid groupId is supplied', (done) => {
      chai.request(app)
        .get('/api/group/10/messages')
        .set('token', sentToken)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id');
          done();
        });
    });
  });
});
