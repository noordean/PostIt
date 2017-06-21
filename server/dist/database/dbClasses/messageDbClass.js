'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _messageModel = require('../models/messageModel');

var _messageModel2 = _interopRequireDefault(_messageModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageClass = function () {
  function MessageClass(sequelize) {
    _classCallCheck(this, MessageClass);

    // create model for message
    this.message = (0, _messageModel2.default)(sequelize);
  }

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