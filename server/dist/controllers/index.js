'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var salt = _bcryptjs2.default.genSaltSync(10);
var token = '';
var userDbInstance = new _userDbClass2.default(_connection2.default);
var groupDbInstance = new _groupDbClass2.default(_connection2.default);
var messageDbInstance = new _messageDbClass2.default(_connection2.default);

/**
 * Controller class that protects the routes
 * @class
 */

var Controller = function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, [{
    key: 'checkForWhiteSpace',
    value: function checkForWhiteSpace(string) {
      return string.trim().length;
    }
    /**
    * @description: protects api/user/signup
    * @param {Object} req
    * @param {Object} res
    * @return {Object} response
    */

  }, {
    key: 'signUp',
    value: function signUp(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      var email = req.body.email;
      if (username === undefined || password === undefined || email === undefined) {
        res.json({ message: 'You need to provide username, password and email' });
      } else if (username.trim().length === 0 || password.trim().length === 0 || email.trim().length === 0) {
        res.json({ message: 'Username, password or email cannot be empty' });
        console.log(/\S+@\S+\.\S+/.test(email));
      } else if (/\S+@\S+\.\S+/.test(email) === false) {
        res.status(401).json({ message: 'Kindly supply a valid email' });
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
    }

    /**
    * @description: protects api/user/signin
    * @param {Object} req
    * @param {Object} res
    * @return {Object} response
    */

  }, {
    key: 'signIn',
    value: function signIn(req, res) {
      var username = req.body.username;
      var password = req.body.password;
      if (username === undefined || password === undefined) {
        res.status(401).json({ message: 'You need to provide username and password' });
      } else if (username.trim().length === 0 || password.trim().length === 0) {
        res.status(401).json({ message: 'Username and password cannot be empty' });
      } else {
        userDbInstance.getUser(username, function (user) {
          if (user.length === 0) {
            res.status(404).json({ message: 'Invalid user!' });
          } else {
            if (_bcryptjs2.default.compareSync(password, user[0].password)) {
              var payload = { username: username };
              token = _jsonwebtoken2.default.sign(payload, 'nuruuuuuuu', {
                expiresIn: '1h'
              });
              res.status(200).json({ message: 'You are now logged in', user: username });
            } else {
              res.status(404).json({ message: 'Incorrect password' });
            }
          }
        });
      }
    }

    /**
    * @description: protects api/group
    * @param {Object} req
    * @param {Object} res
    * @return {Object} response
    */

  }, {
    key: 'createGroup',
    value: function createGroup(req, res) {
      var groupName = req.body.groupName;
      var createdBy = req.body.createdBy;
      if (groupName === undefined || createdBy === undefined) {
        res.status(401).json({ message: 'You need to provide the group-name and the creator\'s username' });
      } else if (groupName.trim().length === 0 || createdBy.trim().length === 0) {
        res.status(401).json({ message: 'group-name and the creator\'s username cannot be empty' });
      } else {
        groupDbInstance.getGroupByName(groupName, function (group) {
          if (group.length === 0) {
            _jsonwebtoken2.default.verify(token, 'nuruuuuuuu', function (err, decode) {
              if (decode !== undefined) {
                if (decode.username === createdBy) {
                  groupDbInstance.createGroup(groupName, createdBy, function (groups) {
                    res.status(200).json({ data: groups.dataValues, message: 'Group successfully created' });
                  });
                } else {
                  res.status(401).json({ message: 'Access denied!. Kindly login before creating group' });
                }
              } else {
                res.status(401).json({ message: 'Access denied!. Kindly login before creating group' });
              }
            });
          } else {
            res.status(404).json({ message: 'The selected group name is unavailable' });
          }
        });
      }
    }

    /**
    * @description: protects api/group/:groupID/user
    * @param {Object} req
    * @param {Object} res
    * @return {Object} response
    */

  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(req, res) {
      var id = req.params.groupID;
      var username = req.body.username;
      if (req.params.groupID === undefined || req.body.username === undefined) {
        res.status(401).json({ message: 'You need to provide the group-id and the username' });
      } else if (id.trim().length === 0 || username.trim().length === 0) {
        res.status(401).json({ message: 'group-id and username cannot be empty' });
      } else if (isNaN(id)) {
        res.status(401).json({ message: 'The supplied id must be an integer' });
      } else {
        groupDbInstance.getGroupById(id, function (group) {
          if (group.length === 0) {
            res.status(404).json({ message: 'Invalid group id' });
          } else {
            userDbInstance.getUser(username, function (user) {
              if (user.length === 0) {
                res.status(404).json({ message: 'Invalid user detected' });
              } else {
                _jsonwebtoken2.default.verify(token, 'nuruuuuuuu', function (err, decode) {
                  if (decode !== undefined) {
                    if (decode.username === group[0].createdby) {
                      groupDbInstance.addUserToGroup(id, username);
                      res.status(200).json({ message: 'user successfully added' });
                    } else {
                      res.status(401).json({ message: 'Access denied!. Kindly login before adding user' });
                    }
                  } else {
                    res.status(401).json({ message: 'Access denied!. Kindly login before adding user' });
                  }
                });
              }
            });
          }
        });
      }
    }

    /**
    * @description: protects api/group/:groupID/message
    * @param {Object} req
    * @param {Object} res
    * @return {Object} response
    */

  }, {
    key: 'postMessageToGroup',
    value: function postMessageToGroup(req, res) {
      var groupID = req.params.groupID;
      var postedBy = req.body.postedBy;
      var message = req.body.message;
      if (groupID === undefined || postedBy === undefined || message === undefined) {
        res.status(401).json({ message: 'You need to provide the group-id, postedBy and message' });
      } else if (groupID.trim().length === 0 || postedBy.trim().length === 0 || message.trim().length === 0) {
        res.status(401).json({ message: 'group-id, user or message cannot be empty' });
      } else if (isNaN(groupID)) {
        res.status(401).json({ message: 'The supplied id must be an integer' });
      } else {
        _jsonwebtoken2.default.verify(token, 'nuruuuuuuu', function (err, decode) {
          if (decode !== undefined) {
            if (decode.username === postedBy) {
              messageDbInstance.postMessage(groupID, postedBy, message);
              res.status(200).json({ message: 'Message posted successfully' });
            } else {
              res.status(401).json({ message: 'Access denied!. Kindly login before posting message' });
            }
          } else {
            res.status(401).json({ message: 'Access denied!. Kindly login before posting message' });
          }
        });
      }
    }

    /**
    * @description: protects api/group/:groupID/messages
    * @param {Object} req
    * @param {Object} res
    * @return {Object} response
    */

  }, {
    key: 'getMessageFromGroup',
    value: function getMessageFromGroup(req, res) {
      var groupID = req.params.groupID;
      if (groupID === undefined || groupID === '' || groupID.trim().length === 0) {
        res.status(401).json({ message: 'group-id must be provided' });
      } else if (isNaN(groupID)) {
        res.status(401).json({ message: 'The supplied id must be an integer' });
      } else {
        messageDbInstance.getMessages(groupID, function (messages) {
          res.status(200).json(messages);
        });
      }
    }
  }]);

  return Controller;
}();

exports.default = Controller;