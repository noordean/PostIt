'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} sequelizeObject
 * @return {Object} group model
 */
exports.default = function (sequelizeObject) {
  var Group = sequelizeObject.define('groups', {
    groupname: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    createdby: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    groupmembers: _sequelize2.default.ARRAY(_sequelize2.default.TEXT)
  }, {
    classMethods: {
      associate: function associate(models) {
        Group.belongsTo(models.User);
        Group.hasMany(models.Message);
      }
    }
  });
  return Group;
};