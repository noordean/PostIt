'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeObject) {
  var User = sequelizeObject.define('users', {
    username: _sequelize2.default.STRING,
    password: _sequelize2.default.STRING,
    email: _sequelize2.default.STRING
  });
  return User;
};