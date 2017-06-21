'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

var _connection = require('../database/dbconnection/connection');

var _connection2 = _interopRequireDefault(_connection);

var _userDbClass = require('../database/dbClasses/userDbClass');

var _userDbClass2 = _interopRequireDefault(_userDbClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userDbInstance = new _userDbClass2.default(_connection2.default);

describe('signup endpoint', function () {
  var username = 'jasmineTest1';
  var anotherUser = 'jasmineTest2';
  var thirdUser = 'jasmineTest3';
  var password = 'ibro12345';
  var email = 'ebro90@gmail.com';

  // save this user to database before every spec
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

describe('signin endpoint', function () {
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
});