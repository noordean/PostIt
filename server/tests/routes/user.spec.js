import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../server';

chai.use(chaiHttp);
const should = chai.should();
let sentToken = '';
describe('PostIt Endpoints', () => {
  describe('POST api/v1/user/signup', () => {
    it('should respond with an error message if invalid email is supplied',
      (done) => {
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
            res.body.message.should.be.eql(
              'Invalid email detected. Kindly supply a valid email');
            done();
          });
      });
    it('should respond with an error message if incorrect password combination is supplied',
      (done) => {
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
            res.body.message.should.be.eql(
              'Password must be alphanumeric and should contain 5-12 characters');
            done();
          });
      });
    it('should respond with an error message if incorrect username combination is supplied',
      (done) => {
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
            res.body.message.should.be.eql(
              'Username should contain only letters and must have between 5-12 characters');
            done();
          });
      });
    it('should respond with an error message if the supplied password is too short',
      (done) => {
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
            res.body.message.should.be.eql(
              'Password must be alphanumeric and should contain 5-12 characters');
            done();
          });
      });
    it('should respond with an error message if the supplied username is too short',
      (done) => {
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
            res.body.message.should.be.eql(
              'Username should contain only letters and must have between 5-12 characters');
            done();
          });
      });
    it('should respond with an error message if password is undefined',
      (done) => {
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
    it('should respond with an error message if user is already registered',
      (done) => {
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
            res.body.message.should.be.eql(
              'You already have an existing account. Kindly go and login');
            done();
          });
      });
    it('should respond with an error message if phoneNumber is invalid',
      (done) => {
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
            res.body.message.should.be.eql(
              'Phone number should not contain letters and should be valid');
            done();
          });
      });
    it('should respond with a success message if correct user details are supplied',
      (done) => {
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
    it('should respond with an error message if username is undefined',
      (done) => {
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
    it('should respond with an error message if password is undefined',
      (done) => {
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
    it('should respond with an error message if invalid username is supplied',
      (done) => {
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
            res.body.message.should.be.eql('User not found');
            done();
          });
      });
    it('should respond with an error message if incorrect password is supplied',
      (done) => {
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
    it('should respond with a success message if correct username and password are supplied',
      (done) => {
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
            res.body.user.username.should.be.eql('existing');
            res.body.user.email.should.be.eql('existing@gmail.com');
            res.body.message.should.be.eql('You are now logged in');
            done();
          });
      });
  });

  describe('POST api/v1/users', () => {
    it('should produce all available users', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send({
          token: sentToken,
          currentMembers: ''
        })
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
    it('should respond with an error message if the login token is undefined',
      (done) => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            currentMembers: 'noMember'
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Your login token must be provided');
            done();
          });
      });
    it('should respond with an error message if the login token is invalid',
      (done) => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            token: 'invalidToken',
            currentMembers: 'noMember'
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Access denied!. Kindly login');
            done();
          });
      });
    it('should respond with an error message if currentMembers is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/users')
          .send({
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'Current members should be supplied');
            done();
          });
      });
  });

  describe('POST api/v1/user/email/verify', () => {
    it('should respond with an error message if invalid token is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/email/verify')
          .set('mailToken', 'invalidToken')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'Access denied!. Invalid url detected');
            done();
          });
      });
  });

  describe('POST api/v1/user/reset-password', () => {
    it('should respond with an error message if recepient is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/reset-password')
          .send({
            newPassword: 'newPassword'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'Both recepient(email) and newPassword must be supplied');
            done();
          });
      });
    it('should respond with an error message if new password is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/reset-password')
          .send({
            recepient: 'existing@gmail.com'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'Both recepient(email) and newPassword must be supplied');
            done();
          });
      });
    it('should respond with an error message if recepient is empty', (done) => {
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
          res.body.message.should.be.eql(
            'Both recepient(email) and newPassword are required');
          done();
        });
    });
    it('should respond with an error message if password is empty', (done) => {
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
          res.body.message.should.be.eql(
            'Both recepient(email) and newPassword are required');
          done();
        });
    });
    it('should respond with an error message if recepient is not found',
      (done) => {
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

  describe('GET api/v1/user/groups', () => {
    it('should respond with an error message if invalid token is supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/user/groups?limit=6&offset=0')
          .set('token', 'invalidToken')
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Access denied!. Kindly login');
            done();
          });
      });
    it('should respond with a success message if correct detail is supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/user/groups?limit=6&offset=0')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('groups');
            res.body.groups.count.should.be.eql(2);
            res.body.groups.rows[0].createdby.should.be.eql('existing');
            res.body.groups.rows[0].groupname.should.be.eql('Correct Group');
            res.body.groups.rows[0].description.should.be.eql('for testing...');
            done();
          });
      });
  });

  describe('POST api/v1/user/notification', () => {
    it('should return an error message if array is not supplied as userId',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/notification')
          .send({
            userId: 3,
            groupName: 'test',
            message: 'hello here',
            postedby: 'noordean',
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'userId must be an array');
            done();
          });
      });
    it('should save notification into database if correct details are supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/notification')
          .send({
            userId: [3, 4],
            groupName: 'test',
            message: 'hello here',
            postedby: 'noordean',
            token: sentToken
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
    it('should return notifications if correct details are supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/user/1/notification')
          .set('token', sentToken)
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
    it('should return a success message if correct details are supplied',
      (done) => {
        chai.request(app)
          .delete('/api/v1/user/1/notification')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Deleted successfully');
            done();
          });
      });
  });

  describe('POST api/v1/user/signup/google', () => {
    it('should return a success message if email is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup/google')
          .send({
            token: sentToken,
            username: 'googleUser',
            password: null,
            phoneNumber: null
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('email must be supplied');
            done();
          });
      });
    it('should return a success message if an invalid email is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup/google')
          .send({
            token: sentToken,
            password: null,
            email: 'googleUser@.com',
            phoneNumber: null
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('username must be supplied');
            done();
          });
      });
    it('should return a success message if correct details are supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup/google')
          .send({
            token: sentToken,
            username: 'googleUser',
            password: null,
            email: 'googleUser@gmail.com',
            phoneNumber: null
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.should.have.property('user');
            res.body.message.should.be.eql('User registered successfully');
            done();
          });
      });
    it('should return a success message if an invalid email is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup/google')
          .send({
            token: sentToken,
            username: 'googleUser',
            password: null,
            email: 'googleUser@.com',
            phoneNumber: null
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('a valid email is required');
            done();
          });
      });
    it('should return a success message if an invalid username is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/signup/google')
          .send({
            token: sentToken,
            username: 'googleUser123',
            password: null,
            email: 'googleUser@gmail.com',
            phoneNumber: null
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(
              'username must contain only letters');
            done();
          });
      });
  });

  describe('POST api/v1/user/email', () => {
    it('should return an error message if recepients is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/email')
          .send({
            token: sentToken,
            groupName: 'fakeGroup',
            message: 'fakeMessage'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('recepients must be supplied');
            done();
          });
      });
    it('should return an error message if groupName is not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/email')
          .send({
            token: sentToken,
            recepients: 'fakeMessage@gmail.com, anodaFake@gmail.com',
            message: 'fakeMessage'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('groupName must be supplied');
            done();
          });
      });
    it('should return an error message if an invalid email is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/email')
          .send({
            token: sentToken,
            groupName: 'fakeGroup',
            recepients: 'fakeMessage@gmail.com, invalidEmail@.com',
            message: 'fakeMessage'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql(`invalid email detected. Kindly check the supplied emails.
                    Multiple emails must be separated with ", "`);
            done();
          });
      });
    it('should return an error message if an invalid token is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/email')
          .send({
            token: 'invalidToken',
            groupName: 'fakeGroup',
            recepients: 'fakeMessage@gmail.com, invalidEmail@.com',
            message: 'fakeMessage'
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

  describe('POST /api/v1/user/sms', () => {
    it('should return an error message if phoneNumbers are not supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/sms')
          .send({
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('phoneNumbers must be supplied');
            done();
          });
      });
    it('should return an error message if the supplied phoneNumbers is not an array',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/sms')
          .send({
            token: sentToken,
            phoneNumbers: '07065765431'
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('phoneNumbers must be an array');
            done();
          });
      });
    it('should return an error message if the an invalid phoneNumber is supplied',
      (done) => {
        chai.request(app)
          .post('/api/v1/user/sms')
          .send({
            token: sentToken,
            phoneNumbers: ['07065rfhfahd', '08097654323']
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Invalid phone-number detected');
            done();
          });
      });
  });
});
