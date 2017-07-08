'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _connection = require('../database/dbconnection/connection');

var _connection2 = _interopRequireDefault(_connection);

var _userDbClass = require('../database/dbClasses/userDbClass');

var _userDbClass2 = _interopRequireDefault(_userDbClass);

var _groupDbClass = require('../database/dbClasses/groupDbClass');

var _groupDbClass2 = _interopRequireDefault(_groupDbClass);

var _messageDbClass = require('../database/dbClasses/messageDbClass');

var _messageDbClass2 = _interopRequireDefault(_messageDbClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var salt = _bcryptjs2.default.genSaltSync(10);

var userDbInstance = new _userDbClass2.default(_connection2.default);
var groupDbInstance = new _groupDbClass2.default(_connection2.default);
var messageDbInstance = new _messageDbClass2.default(_connection2.default);

var token = void 0;
// user signup
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
        var hashedPassword = _bcryptjs2.default.hashSync(password, salt);
        userDbInstance.saveUser(username, hashedPassword, email);
        res.json({ message: 'Registration successful' });
      } else {
        res.json({ message: 'You already have an existing account. Kindly go and login' });
      }
    });
  }
});

// user signin
router.post('/api/user/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  if (username === undefined || password === undefined) {
    res.json({ message: 'You need to provide username and password' });
  } else if (username === '' || password === '') {
    res.json({ message: 'Username and password cannot be empty' });
  } else {
    userDbInstance.getUser(username, function (user) {
      if (user.length === 0) {
        res.json({ message: 'Invalid user!' });
      } else {
        if (_bcryptjs2.default.compareSync(password, user[0].password)) {
          var payload = { username: username };
          token = _jsonwebtoken2.default.sign(payload, 'nuruuuuuuu', {
            expiresIn: '1h'
          });
          res.json({ message: 'You are now logged in', user: username });
        } else {
          res.json({ message: 'Incorrect password' });
        }
      }
    });
  }
});

// creates group
router.post('/api/group', function (req, res) {
  var groupName = req.body.groupName;
  var createdBy = req.body.createdBy;
  if (groupName === undefined || createdBy === undefined) {
    res.json({ message: 'You need to provide the group-name and the creator\'s username' });
  } else if (groupName === '' || createdBy === '') {
    res.json({ message: 'group-name and the creator\'s username cannot be empty' });
  } else {
    groupDbInstance.getGroupByName(groupName, function (group) {
      if (group.length === 0) {
        _jsonwebtoken2.default.verify(token, 'nuruuuuuuu', function (err, decode) {
          if (decode !== undefined) {
            if (decode.username === createdBy) {
              groupDbInstance.createGroup(groupName, createdBy);
              res.json({ message: 'Group successfully created' });
            } else {
              res.json({ message: 'Access denied!. Kindly login before creating group' });
            }
          } else {
            res.json({ message: 'Access denied!. Kindly login before creating group' });
          }
        });
      } else {
        res.json({ message: 'The selected group name is unavailable' });
      }
    });
  }
});

// adds user to group
router.post('/api/group/:groupID/user', function (req, res) {
  var id = req.params.groupID;
  var username = req.body.username;
  if (id === undefined || username === undefined) {
    res.json({ message: 'You need to provide the group-id and the username' });
  } else if (id === '' || username === '') {
    res.json({ message: 'group-id and username cannot be empty' });
  } else {
    groupDbInstance.getGroupById(id, function (group) {
      if (group.length === 0) {
        res.json({ message: 'Invalid group id' });
      } else {
        userDbInstance.getUser(username, function (user) {
          if (user.length === 0) {
            res.json({ message: 'Invalid user detected' });
          } else {
            _jsonwebtoken2.default.verify(token, 'nuruuuuuuu', function (err, decode) {
              if (decode !== undefined) {
                if (decode.username === group[0].createdby) {
                  groupDbInstance.addUserToGroup(id, username);
                  res.json({ message: 'user successfully added' });
                } else {
                  res.json({ message: 'Access denied!. Kindly login before adding user' });
                }
              } else {
                res.json({ message: 'Access denied!. Kindly login before adding user' });
              }
            });
          }
        });
      }
    });
  }
});

router.post('/api/group/:groupID/message', function (req, res) {
  var groupID = req.params.groupID;
  var postedBy = req.body.postedBy;
  var message = req.body.message;
  if (groupID === undefined || postedBy === undefined || message === undefined) {
    res.json({ message: 'You need to provide the group-id, postedBy and message' });
  } else if (groupID === '' || postedBy === '' || message === '') {
    res.json({ message: 'group-id, user or message cannot be empty' });
  } else {
    _jsonwebtoken2.default.verify(token, 'nuruuuuuuu', function (err, decode) {
      if (decode !== undefined) {
        if (decode.username === postedBy) {
          messageDbInstance.postMessage(groupID, postedBy, message);
          res.json({ message: 'Message posted successfully' });
        } else {
          res.json({ message: 'Access denied!. Kindly login before posting message' });
        }
      } else {
        res.json({ message: 'Access denied!. Kindly login before posting message' });
      }
    });
  }
});

router.get('/api/group/:groupID/messages', function (req, res) {
  var groupID = req.params.groupID;
  if (groupID === undefined || groupID === '') {
    res.json({ message: 'group-id must be provided' });
  } else {
    messageDbInstance.getMessages(groupID, function (messages) {
      res.json(messages);
    });
  }
});

router.get('/', function (req, res) {
  res.send('PostIt API running...');
});

router.get('*', function (req, res) {
  res.send('Page Not Found');
});

exports.default = router;