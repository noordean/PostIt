'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeObject) {
  var Group = sequelizeObject.define('groups', {
    groupname: _sequelize2.default.STRING,
    createdby: _sequelize2.default.STRING,
    groupmembers: _sequelize2.default.ARRAY(_sequelize2.default.TEXT)
  });
  return Group;
};