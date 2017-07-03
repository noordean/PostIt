'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messageModel = require('../models/messageModel');

var _messageModel2 = _interopRequireDefault(_messageModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Message class
 * @class
 */
var MessageClass = function () {
  /**
   * @description: having the model 'message' as an object property
   * @param {object} sequelize
   * @constructor
   */
  function MessageClass(sequelize) {
    _classCallCheck(this, MessageClass);

    this.message = (0, _messageModel2.default)(sequelize);
  }

  /**
  * @description: posts message to a group of id groupid
  * @param {Number} groupid
  * @param {String} postedby
  * @param {String} message
  * @return {Object} postedData
  */


  _createClass(MessageClass, [{
    key: 'postMessage',
    value: function postMessage(groupid, postedby, message) {
      var _this = this;

      this.message.sync().then(function () {
        return _this.message.create({
          groupid: groupid,
          postedby: postedby,
          message: message
        }).catch(function (err) {
          throw new Error(err);
        });
      });
    }

    /**
    * @description: retrieves message from a group of id 'groupid'
    * @param {Number} groupID
    * @param {Function} done
    * @return {Object} retrievedData
    */

  }, {
    key: 'getMessages',
    value: function getMessages(groupID, done) {
      this.message.findAll({ where: { groupid: groupID } }).then(function (data) {
        done(data);
      }).catch(function (err) {
        throw new Error(err);
      });
    }
  }]);

  return MessageClass;
}();

exports.default = MessageClass;