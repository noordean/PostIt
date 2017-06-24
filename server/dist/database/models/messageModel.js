'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeObject) {
  var Message = sequelizeObject.define('messages', {
    groupid: _sequelize2.default.INTEGER,
    postedby: _sequelize2.default.STRING,
    message: _sequelize2.default.STRING
  });
  return Message;
};