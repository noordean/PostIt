import dotenv from 'dotenv';
import chaiHttp from 'chai-http';
import chai from 'chai';
import bcrypt from 'bcryptjs';
import app from '../server';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';
import messageDbClass from '../database/dbClasses/messageDbClass';
import helperObject from './helper';

dotenv.config();

chai.use(chaiHttp);
const salt = bcrypt.genSaltSync(10);
const should = chai.should();
const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);
const messageDbInstance = new messageDbClass(sequelize);
const hashedPassword = bcrypt.hashSync(helperObject.alreadyRegisteredUser.password, salt);

describe('PostIt Endpoints', () => {
  let sentToken = '';
  beforeEach((done) => {
    userDbInstance.saveUser(helperObject.alreadyRegisteredUser.username, hashedPassword, helperObject.alreadyRegisteredUser.email, () => {

    });
    done();
  });
  beforeEach((done) => {
    groupDbInstance.createGroup('already created group', 'nurudeen', () => {

    });
    done();
  });
  describe('POST api/user/signup', () => {
    afterEach((done) => {
      userDbInstance.deleteUser(helperObject.validRegUser.username);
      userDbInstance.deleteUser(helperObject.alreadyRegisteredUser.username);
      done();
    });
    it('should respond with error message if invalid email is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithInvalidEmail)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid email detected. Kindly supply a valid email');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if incorrect password combination is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithWrongPassword)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be alphanumeric and should contain 5-12 characters');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if incorrect username combination is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithWrongUsername)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Username should contain only letters and must have between 5-12 characters');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if incorrect username combination is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithShortPassword)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be alphanumeric and should contain 5-12 characters');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if incorrect username combination is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithShortUsername)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Username should contain only letters and must have between 5-12 characters');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if username is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithNoUsername)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('username must be supplied');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if password is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithNoPassword)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Password must be supplied');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if email is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signup')
        .send(helperObject.regUserWithNoEmail)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('email must be supplied');
          done();
        });
    }).timeout(20000);
  });

  describe('POST api/user/signin', () => {
    it('should respond with error message if username is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send(helperObject.loginUserWithNoUsername)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide username and password');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if password is undefined', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send(helperObject.loginUserWithNoPassword)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide username and password');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if invalid username is supplied', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send(helperObject.loginInvalidUser)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid user!');
          done();
        });
    }).timeout(20000);
    it('should respond with success message if correct username and password are supplied', (done) => {
      chai.request(app)
        .post('/api/user/signin')
        .send(helperObject.loginUserWithcorrectPassword)
        .end((err, res) => {
          sentToken = res.body.token;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You are now logged in');
          done();
        });
    }).timeout(20000);
  });

  describe('POST api/group', () => {
    afterEach((done) => {
      groupDbInstance.deleteGroup('Group Testing');
      groupDbInstance.deleteGroup('already created group');
      done();
    });
    it('should respond with error message if empty groupname is supplied', (done) => {
      chai.request(app)
        .post('/api/group')
        .send(helperObject.createGroupWithEmptyGroupname)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The group-name cannot be empty');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if groupname is not supplied', (done) => {
      chai.request(app)
        .post('/api/group')
        .send(helperObject.createGroupWithNoGroupname)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The group-name and your logged-in token must be specified');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if token is not supplied', (done) => {
      chai.request(app)
        .post('/api/group')
        .send(helperObject.createGroupWithNoGroupname)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The group-name and your logged-in token must be specified');
          done();
        });
    }).timeout(20000);
    it('should respond with success message if the correct group-name and logged-in token are specified', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({ groupName: 'Group Testing', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Group successfully created');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if user is not logged in', (done) => {
      chai.request(app)
        .post('/api/group')
        .send({ groupName: 'already created group', token: 'nonsense' })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Access denied!. Kindly login before creating group');
          done();
        });
    }).timeout(20000);
  });

  describe('POST api/group/:groupID/user', () => {
    it('should respond with error message if incorrect id is used', (done) => {
      chai.request(app)
        .post('/api/group/146447878/user')
        .send({ username: 'nurudeen', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if invalid id is used', (done) => {
      chai.request(app)
        .post('/api/group/14hjgjdkskb/user')
        .send({ username: 'nurudeen', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id must be an integer');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if username is not defined', (done) => {
      chai.request(app)
        .post('/api/group/14678923562789/user')
        .send({ token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, your logged-in token and the username to add');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .post('/api/group/157235927/user')
        .send({ username: 'nurudeen' })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, your logged-in token and the username to add');
          done();
        });
    }).timeout(20000);
  });

  describe('POST api/group/:groupID/message', () => {
    it('should respond with error message if token is not defined', (done) => {
      chai.request(app)
        .post('/api/group/17539649632/message')
        .send({ message: 'Hi guyz' })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, your logged-in token and the message');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if message is not defined', (done) => {
      chai.request(app)
        .post('/api/group/17539649/message')
        .send({ token: 'nonsense' })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('You need to provide the group-id, your logged-in token and the message');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if groupID is empty', (done) => {
      chai.request(app)
        .post('/api/group/ /message')
        .send({ message: 'Hi guyz', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('group-id or message cannot be empty');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if token is incorrect', (done) => {
      chai.request(app)
        .post('/api/group/17539649632jkdghfjkhgdk/message')
        .send({ message: 'Hi guyz', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('The supplied id must be an integer');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if id is invalid', (done) => {
      chai.request(app)
        .post('/api/group/17539649/message')
        .send({ message: 'Hi guyz', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('Invalid group id');
          done();
        });
    }).timeout(20000);
    it('should respond with error message if message is empty', (done) => {
      chai.request(app)
        .post('/api/group/17539649/message')
        .send({ message: '', token: sentToken })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.eql('group-id or message cannot be empty');
          done();
        });
    }).timeout(20000);
  });
});
