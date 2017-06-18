'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _connection = require('../database/dbconnection/connection');

var _connection2 = _interopRequireDefault(_connection);

var _userDbClass = require('../database/dbClasses/userDbClass');

var _userDbClass2 = _interopRequireDefault(_userDbClass);

var _groupDbClass = require('../database/dbClasses/groupDbClass');

var _groupDbClass2 = _interopRequireDefault(_groupDbClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var salt = _bcrypt2.default.genSaltSync(10);

var userDbInstance = new _userDbClass2.default(_connection2.default);
var groupDbInstance = new _groupDbClass2.default(_connection2.default);

router.post('/api/user/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  if (username === undefined || password === undefined || email === undefined) {
    res.json({ message: 'You need to provide username, password and email' });
  } else if (username === '' || password === '' || email === '') {
    res.json({ message: 'Username, password or email cannot be empty' });
  } else {
    userDbInstance.getUser(username, function (user) {
      if (user.length === 0) {
        var hashedPassword = _bcrypt2.default.hashSync(password, salt);
        userDbInstance.saveUser(username, hashedPassword, email);
        res.json({ message: 'Rgistration successful' });
      } else {
        res.json({ message: 'You already have an existing account. Kindly go and login' });
      }
    });
  }
});

router.post('/api/user/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username === undefined || password === undefined) {
    res.json({ message: 'You need to provide username, password' });
  } else if (username === '' || password === '') {
    res.json({ message: 'Username, password cannot be empty' });
  } else {
    userDbInstance.getUser(username, function (user) {
      if (user.length === 0) {
        res.json({ message: 'Invalid user!' });
      } else {
        if (_bcrypt2.default.compareSync(password, user[0].password)) {
          res.json({ message: 'You are now logged in' });
        } else {
          res.json({ message: 'Incorrect password' });
        }
      }
    });
  }
});

router.post('/api/group', function (req, res) {
  var groupName = req.body.groupname;
  var createdBy = req.body.createdby;
  if (groupName === undefined || createdBy === undefined) {
    res.json({ message: 'You need to provide the group-name and the creator\'s username' });
  } else if (groupName === '' || createdBy === '') {
    res.json({ message: 'group-name and the creator\'s username cannot be empty' });
  } else {
    groupDbInstance.getGroup(groupName, function (group) {
      if (group.length === 0) {
        groupDbInstance.createGroup(groupName, createdBy);
        res.json({ message: 'Group successfully created' });
      } else {
        res.json({ message: 'The selected group name is unavailable' });
      }
    });
  }
});

router.post('/api/group/:groupID/user', function (req, res) {
  res.json({ message: 'This is to add a user to a group with id ' + req.params.groupID });
});

router.post('/api/group/:groupID/message', function (req, res) {
  res.json({ message: 'This is to post message to a group with id ' + req.params.groupID });
});

router.get('/api/group/:groupID/messages', function (req, res) {
  res.json({ message: 'This is to retrieve messages from a group with ' + req.params.groupID });
});

router.get('/', function (req, res) {
  res.send('PostIt API running...');
});

router.get('*', function (req, res) {
  res.send('Page Not Found');
});

exports.default = router;