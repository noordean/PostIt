'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connection = require('../database/dbconnection/connection');

var _connection2 = _interopRequireDefault(_connection);

var _userDbClass = require('../database/dbClasses/userDbClass');

var _userDbClass2 = _interopRequireDefault(_userDbClass);

var _groupDbClass = require('../database/dbClasses/groupDbClass');

var _groupDbClass2 = _interopRequireDefault(_groupDbClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var userDbInstance = new _userDbClass2.default(_connection2.default);
var groupDbInstance = new _groupDbClass2.default(_connection2.default);

var EndpointsValidation = function () {
  function EndpointsValidation() {
    _classCallCheck(this, EndpointsValidation);
  }

  _createClass(EndpointsValidation, [{
    key: 'signUp',
    value: function signUp(username, password, email) {
      if (username === undefined || password === undefined || email === undefined) {
        return { message: 'You need to provide username, password and email' };
      } else if (username === '' || password === '' || email === '') {
        return { message: 'Username, password or email cannot be empty' };
      } else {
        userDbInstance.saveUser(username, password, email);
        return { message: 'Rgistration successful' };
      }
    }
  }, {
    key: 'signIn',
    value: function signIn(username, password) {
      var response = {};
      if (username === undefined || password === undefined) {
        response.message = 'You need to provide username and password';
      } else if (username === '' || password === '') {
        response.message = 'Username, password cannot be empty';
      }
      return response;
    }
  }, {
    key: 'createGroup',
    value: function createGroup(groupName, createdBy) {
      if (groupName === undefined || createdBy === undefined) {
        return { message: 'You need to provide the group-name and the creator\'s username' };
      } else if (groupName === '' || createdBy === '') {
        return { message: 'group-name and the creator\'s username cannot be empty' };
      } else {
        groupDbInstance.createGroup(groupName, createdBy);
        return { message: 'Group successfully created' };
      }
    }
  }]);

  return EndpointsValidation;
}();

exports.default = EndpointsValidation;