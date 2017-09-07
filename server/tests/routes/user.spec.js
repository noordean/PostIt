import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../server';

chai.use(chaiHttp);
const should = chai.should();
let sentToken = '';
describe('PostIt Endpoints', () => {
  describe('POST api/v1/user/signup', () => {
    it('should respond with error message if invalid email is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'invalidEmail',
          password: 'invalid123',
          email: 'invalidEmail',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid email detected. Kindly supply a valid email');
          done();
        });
    });
    it('should respond with error message if incorrect password combination is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'incorrect',
          password: 'incorrectPassword',
          email: 'incorrect@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be alphanumeric and should contain 5-12 characters');
          done();
        });
    });
    it('should respond with error message if incorrect username combination is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'incorrect123',
          password: 'incorrect123',
          email: 'incorrect123@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Username should contain only letters and must have between 5-12 characters');
          done();
        });
    });
    it('should respond with error message if the supplied password is too short', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'shortUser',
          password: 'shot',
          email: 'shortUser@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be alphanumeric and should contain 5-12 characters');
          done();
        });
    });
    it('should respond with error message if the supplied username is too short', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'shot',
          password: 'short123',
          email: 'short@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Username should contain only letters and must have between 5-12 characters');
          done();
        });
    });
    it('should respond with error message if password is undefined', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'undefPass',
          email: 'undefPass@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be supplied');
          done();
        });
    });
    it('should respond with error message if user is already registered', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'existing',
          password: 'exist123',
          email: 'existing@gmail.com',
          phoneNumber: '07098765432'
        })
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You already have an existing account. Kindly go and login');
          done();
        });
    });
    it('should respond with error message if phoneNumber is invalid', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'invaPhone',
          password: 'invaPh123',
          email: 'invalidPhone@gmail.com',
          phoneNumber: '07098765HY'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Phone number should not contain letters and should be valid');
          done();
        });
    });
    it('should respond with success message if correct user details are supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signup')
        .send({
          username: 'correct',
          password: 'correct123',
          email: 'correct@gmail.com',
          phoneNumber: '07098765132'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('user');
          res.body.message.should.be.eql('Registration successful');
          done();
        });
    });
  });

  describe('POST api/v1/user/signin', () => {
    it('should respond with error message if username is undefined', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .send({
          password: 'undefUser1'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('username must be supplied');
          done();
        });
    });
    it('should respond with error message if password is undefined', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'undefUser'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('password must be supplied');
          done();
        });
    });
    it('should respond with error message if invalid username is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'INVALID',
          password: 'invaUser123'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid user!');
          done();
        });
    });
    it('should respond with error message if incorrect password is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'existing',
          password: 'incorrect123'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Incorrect password');
          done();
        });
    });
    it('should respond with success message if correct username and password are supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/signin')
        .send({
          username: 'existing',
          password: 'exist123'
        })
        .end((err, res) => {
          sentToken = res.body.user.token;
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('user');
          res.body.message.should.be.eql('You are now logged in');
          done();
        });
    });
  });

  describe('GET api/v1/users', () => {
    it('should produce all users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('token', sentToken)
        .set('userrs', 'nouser')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('users');
          res.body.users[0].username.should.be.eql('existing');
          res.body.users[0].email.should.be.eql('existing@gmail.com');
          res.body.users[0].phoneNumber.should.be.eql('07012345678');
          done();
        });
    });
    it('should respond with error message if the login token is undefined', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('userrs', 'nouser')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Your login token must be provided');
          done();
        });
    });
    it('should respond with error message if the login token is invalid', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('token', 'invalidToken')
        .set('userrs', 'nouser')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login');
          done();
        });
    });
  });

  describe('POST api/v1/group/:groupID/user', () => {
    it('should respond with success message if correct details are supplied', (done) => {
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
          res.body.user.userId.should.be.eql(1);
          done();
        });
    });
    it('should respond with error message if incorrect group id is used', (done) => {
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
    it('should respond with error message if invalid group id is used', (done) => {
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
          res.body.message.should.be.eql('The supplied id\'s must be integers');
          done();
        });
    });
    it('should respond with error message if userId is not defined', (done) => {
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
    it('should respond with error message if token is not defined', (done) => {
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
    it('should respond with error message if invalid token is supplied', (done) => {
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
    it('should respond with error message if userId is empty', (done) => {
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
    it('should respond with error message if groupId is empty', (done) => {
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
    it('should respond with error message if user is already in the group', (done) => {
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

  describe('GET api/group/:groupID/user', () => {
    it('should respond with success message if correct details are supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/1/users')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('users');
          res.body.users[0].username.should.be.eql('existing');
          done();
        });
    });
    it('should respond with error message if incorrect groupId is supplied', (done) => {
      chai.request(app)
        .get('/api/v1/group/1537625/users')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Group does not exist');
          done();
        });
    });
    it('should respond with error message if login token is not defined', (done) => {
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
    it('should respond with error message if incorrect login token is supplied', (done) => {
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

  describe('POST api/v1/user/email/verify', () => {
    it('should respond with error message if invalid token is supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/email/verify')
        .set('mailToken', 'invalidToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Invalid url detected');
          done();
        });
    });
  });

  describe('GET api/v1/users', () => {
    it('should respond with error message if invalid token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('token', 'invalidToken')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login');
          done();
        });
    });
    it('should respond with error message if userrs is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('token', sentToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('users to ignore should be supplied');
          done();
        });
    });
  });

  describe('POST api/v1/user/reset-password', () => {
    it('should respond with error message if recepient is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/reset-password')
        .send({
          newPassword: 'newPassword'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Both recepient(email) and newPassword must be supplied');
          done();
        });
    });
    it('should respond with error message if new password is not supplied', (done) => {
      chai.request(app)
        .post('/api/v1/user/reset-password')
        .send({
          recepient: 'existing@gmail.com'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Both recepient(email) and newPassword must be supplied');
          done();
        });
    });
    it('should respond with error message if recepient is empty', (done) => {
      chai.request(app)
        .post('/api/v1/user/reset-password')
        .send({
          recepient: '',
          newPassword: 'newPass123'
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Both recepient(email) and newPassword are required');
          done();
        });
    });
    it('should respond with error message if password is empty', (done) => {
      chai.request(app)
        .post('/api/v1/user/reset-password')
        .send({
          recepient: 'existing@gmail.com',
          newPassword: ''
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Both recepient(email) and newPassword are required');
          done();
        });
    });
    it('should respond with error message if recepient is not found', (done) => {
      chai.request(app)
        .post('/api/v1/user/reset-password')
        .send({
          recepient: 'notFound@gmail.com',
          newPassword: 'newPass123'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Email not found');
          done();
        });
    });
  });
});
