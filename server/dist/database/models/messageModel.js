'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {Object} sequelizeObject
 * @return {Object} message model
 */
exports.default = function (sequelizeObject) {
  var Message = sequelizeObject.define('messages', {
    groupid: {
      type: _sequelize2.default.INTEGER,
      allowNull: false
    },
    postedby: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    message: {
      type: _sequelize2.default.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        Message.belongsTo(models.Group);
        Message.belongsTo(models.User);
      }
    }
  });
  return Message;
};