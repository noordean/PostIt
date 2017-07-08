'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _connection = require('../database/dbconnection/connection');

var _connection2 = _interopRequireDefault(_connection);

var _userDbClass = require('../database/dbClasses/userDbClass');

var _userDbClass2 = _interopRequireDefault(_userDbClass);

var _groupDbClass = require('../database/dbClasses/groupDbClass');

var _groupDbClass2 = _interopRequireDefault(_groupDbClass);

var _messageDbClass = require('../database/dbClasses/messageDbClass');

var _messageDbClass2 = _interopRequireDefault(_messageDbClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var userDbInstance = new _userDbClass2.default(_connection2.default);
var groupDbInstance = new _groupDbClass2.default(_connection2.default);
var messageDbInstance = new _messageDbClass2.default(_connection2.default);

describe('Endpoint: signup', function () {
  var username = 'jasmineTest1';
  var anotherUser = 'jasmineTest2';
  var thirdUser = 'jasmineTest3';
  var password = 'ibro12345';
  var email = 'ebro90@gmail.com';

  // save this user to database before test suite
  beforeAll(function () {
    userDbInstance.saveUser(username, password, email);
  });

  // delete this user from database after every spec
  afterEach(function () {
    userDbInstance.deleteUser(username);
    userDbInstance.deleteUser(anotherUser);
  });

  it('should return an error message if username is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ password: password, email: email }).expect({ message: 'You need to provide username, password and email' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if password is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: username, email: email }).expect({ message: 'You need to provide username, password and email' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if email is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: username, password: password }).expect({ message: 'You need to provide username, password and email' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if username is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: '', password: password, email: email }).expect({ message: 'Username, password or email cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if email is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: username, password: password, email: '' }).expect({ message: 'Username, password or email cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if password is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: username, password: '', email: email }).expect({ message: 'Username, password or email cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return a success message if username, password and email are supplied', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: anotherUser, password: password, email: email }).expect({ message: 'Registration successful' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);

  it('should return an error message if a user has already registered', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signup').send({ username: thirdUser, password: password, email: email }).expect({ message: 'You already have an existing account. Kindly go and login' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);
});

describe('Endpoint: signin', function () {
  var username = 'jasmineTest1';
  var password = 'ibro12345';

  it('should return an error message if username is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ password: password }).expect({ message: 'You need to provide username and password' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if password is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ username: username }).expect({ message: 'You need to provide username and password' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if username is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ username: '', password: password }).expect({ message: 'Username and password cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if passwords is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ username: username, password: '' }).expect({ message: 'Username and password cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if a user is invalid', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ username: 'invalidUser', password: 'invalid12345' }).expect({ message: 'Invalid user!' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);

  it('should return a success message for a valid user', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ username: 'success', password: process.env.SUCCESS_PASSWORD }).expect({ message: 'You are now logged in', user: 'success' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);

  it('should return an error message for a wrong password', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/user/signin').send({ username: 'success', password: 'wrong123' }).expect({ message: 'Incorrect password' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);
});

describe('Endpoint: create-group', function () {
  var groupName = 'Cohort-22';
  var createdBy = 'Ibrahim';
  var groupSuccess = 'Group-Testing';
  var userSuccess = 'success';
  // create this group into database before test suite
  beforeAll(function () {
    groupDbInstance.createGroup(groupSuccess, userSuccess);
  });

  // delete this group from database after each spec
  afterEach(function () {
    groupDbInstance.deleteGroup(groupSuccess);
  });
  it('should return an error message if groupName is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group').send({ groupName: groupName }).expect({ message: 'You need to provide the group-name and the creator\'s username' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if createdBy is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group').send({ createdBy: createdBy }).expect({ message: 'You need to provide the group-name and the creator\'s username' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if groupName is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group').send({ groupName: '', createdBy: createdBy }).expect({ message: 'group-name and the creator\'s username cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if createdBy is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group').send({ groupName: groupName, createdBy: '' }).expect({ message: 'group-name and the creator\'s username cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if the group is already existing', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group').send({ groupName: groupName, createdBy: createdBy }).expect({ message: 'The selected group name is unavailable' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if the user has not logged in', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group').send({ groupName: 'something', createdBy: 'noordean' }).expect({ message: 'Access denied!. Kindly login before creating group' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return a success message if valid groupname and createdby(username) are provided', function (done) {
    (0, _supertest2.default)(_server2.default).get('/api/group').send({ groupName: groupSuccess, createdBy: userSuccess }).end(function (err, res) {
      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)[0].message).toEqual('Group successfully created');
      done();
    });
  });
});

describe('Endpoint: add user to group', function () {
  it('should return an error message if username is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/user').send({ username: undefined }).expect({ message: 'You need to provide the group-id and the username' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if username is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/user').send({ username: '' }).expect({ message: 'group-id and username cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return invalid group id if an invalid id is supplied ', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/5156531/user').send({ username: 'noordean' }).expect({ message: 'Invalid group id' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if user has not logged in ', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/3/user').send({ username: 'noordean' }).expect({ message: 'Access denied!. Kindly login before adding user' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });
});

describe('Endpoint: post message to group', function () {
  var message = 'This is an announcement';
  var postedBy = 'noordean';

  // delete this message after every spec
  afterEach(function () {
    messageDbInstance.deleteMessage(postedBy);
  });
  it('should return an error message if postedby is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/message').send({ message: message }).expect({ message: 'You need to provide the group-id, postedBy and message' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if message is undefined', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/message').send({ postedBy: postedBy }).expect({ message: 'You need to provide the group-id, postedBy and message' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if postedby is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/message').send({ message: message, postedBy: '' }).expect({ message: 'group-id, user or message cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if message is empty', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/message').send({ message: '', postedBy: postedBy }).expect({ message: 'group-id, user or message cannot be empty' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return an error message if user has not logged in', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/:groupID/message').send({ message: 'something', postedBy: 'noordean' }).expect({ message: 'Access denied!. Kindly login before posting message' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });

  it('should return a success message if groupID, message and postedby are supplied', function (done) {
    (0, _supertest2.default)(_server2.default).post('/api/group/27/message').send({ message: message, postedBy: 'success' }).expect({ message: 'Message posted successfully' }).end(function (err) {
      if (err) {
        done.fail(err);
      } else {
        done();
      }
    });
  });
});

describe('Endpoint: get messages from group', function () {
  it('should return messages of a group if correct groupID is supplied', function (done) {
    (0, _supertest2.default)(_server2.default).get('/api/group/1/messages').send({}).end(function (err, res) {
      expect(res.status).toEqual(200);
      expect(JSON.parse(res.text)[0].postedby).toEqual('Testing');
      expect(JSON.parse(res.text)[0].message).toEqual('This is for testing');
      done();
    });
  });
});