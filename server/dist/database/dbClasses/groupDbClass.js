'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _groupModel = require('../models/groupModel');

var _groupModel2 = _interopRequireDefault(_groupModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupClass = function () {
  function GroupClass(sequelize) {
    _classCallCheck(this, GroupClass);

    // create model for group
    this.group = (0, _groupModel2.default)(sequelize);
  }

  _createClass(GroupClass, [{
    key: 'createGroup',
    value: function createGroup(groupname, createdby) {
      var _this = this;

      var groupmembers = [createdby];
      this.group.sync().then(function () {
        return _this.group.create({
          groupname: groupname,
          createdby: createdby,
          groupmembers: groupmembers
        }).catch(function (err) {
          throw new Error(err);
        });
      });
    }
  }, {
    key: 'getGroupByName',
    value: function getGroupByName(groupName, done) {
      this.group.findAll({ where: { groupname: groupName } }).then(function (group) {
        done(group);
      });
    }
  }, {
    key: 'getGroupById',
    value: function getGroupById(groupId, done) {
      this.group.findAll({ where: { id: groupId } }).then(function (group) {
        done(group);
      });
    }
  }, {
    key: 'addUserToGroup',
    value: function addUserToGroup(groupId, username) {
      var _this2 = this;

      this.group.find({ where: { id: groupId } }).then(function (group) {
        var newMembers = group.groupmembers;
        if (newMembers.indexOf(username) === -1) {
          newMembers.push(username);
        }
        _this2.group.update({ groupmembers: newMembers }, { where: { id: groupId } });
      });
    }
  }]);

  return GroupClass;
}();

exports.default = GroupClass;