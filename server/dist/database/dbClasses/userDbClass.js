'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _userModel = require('../models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Message class
 * @class
 */
var UserClass = function () {
  /**
   * @description: having the model 'user' as an object property
   * @param {object} sequelize
   * @constructor
   */
  function UserClass(sequelize) {
    _classCallCheck(this, UserClass);

    this.user = (0, _userModel2.default)(sequelize);
  }

  /**
  * @description: saves user to database
  * @param {String} username
  * @param {String} password
  * @param {String} email
  * @return {Object} savedData
  */


  _createClass(UserClass, [{
    key: 'saveUser',
    value: function saveUser(username, password, email) {
      var _this = this;

      this.user.sync().then(function () {
        return _this.user.create({
          username: username,
          password: password,
          email: email
        }).catch(function (err) {
          throw new Error(err);
        });
      });
    }

    /**
    * @description: retrieves user using the username
    * @param {String} userName
    * @param {Function} done
    * @return {Object} retrievedData
    */

  }, {
    key: 'getUser',
    value: function getUser(userName, done) {
      this.user.findAll({ where: { username: userName } }).then(function (data) {
        done(data);
      }).catch(function (err) {
        throw new Error(err);
      });
    }

    /**
    * @description: retrieves all users
    * @param {Function} done
    * @return {Object} retrievedData
    */

  }, {
    key: 'getAllUsers',
    value: function getAllUsers(done) {
      this.user.findAll({}).then(function (data) {
        done(data);
      }).catch(function (err) {
        throw new Error(err);
      });
    }

    /**
    * @description: delete a user using the username
    * @param {String} userName
    * @return {Object} deletedData
    */

  }, {
    key: 'deleteUser',
    value: function deleteUser(userName) {
      this.user.destroy({ where: { username: userName } });
    }
  }]);

  return UserClass;
}();

exports.default = UserClass;