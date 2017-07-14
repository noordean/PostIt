'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (sequelizeObject) {
  var User = sequelizeObject.define('users', {
    username: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    password: {
      type: _sequelize2.default.STRING,
      allowNull: false
    },
    email: {
      type: _sequelize2.default.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function associate(models) {
        User.hasMany(models.Group);
        User.hasMany(models.Message);
      }
    }
  });
  return User;
};