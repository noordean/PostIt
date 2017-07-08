'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _groupModel = require('../models/groupModel');

var _groupModel2 = _interopRequireDefault(_groupModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Group class
 * @class
 */
var GroupClass = function () {
  /**
   * @description: having the model 'group' as an object property
   * @param {object} sequelize
   * @constructor
   */
  function GroupClass(sequelize) {
    _classCallCheck(this, GroupClass);

    this.group = (0, _groupModel2.default)(sequelize);
  }

  /**
  * @description: creates group
  * @param {String} groupname
  * @param {String} createdby
  * @param {Function} done
  * @return {Object} insertedData
  */


  _createClass(GroupClass, [{
    key: 'createGroup',
    value: function createGroup(groupname, createdby, done) {
      var _this = this;

      var groupmembers = [createdby];
      return this.group.sync().then(function () {
        _this.group.create({
          groupname: groupname,
          createdby: createdby,
          groupmembers: groupmembers
        }).then(function (group) {
          done(group);
        }).catch(function (err) {
          throw new Error(err);
        });
      });
    }

    /**
    * @description: retrieves group using groupName
    * @param {String} groupName
    * @param {Function} done
    * @return {Object} retrievedData
    */

  }, {
    key: 'getGroupByName',
    value: function getGroupByName(groupName, done) {
      this.group.findAll({ where: { groupname: groupName } }).then(function (group) {
        done(group);
      });
    }

    /**
    * @description: retrieves group using group id
    * @param {String} groupId
    * @param {Function} done
    * @return {Object} retrievedData
    */

  }, {
    key: 'getGroupById',
    value: function getGroupById(groupId, done) {
      this.group.findAll({ where: { id: groupId } }).then(function (group) {
        done(group);
      });
    }

    /**
    * @description: get all groups
    * @param {Function} done
    * @return {Object} retrievedData
    */

  }, {
    key: 'getAllGroups',
    value: function getAllGroups(done) {
      this.group.findAll({}).then(function (group) {
        done(group);
      });
    }
    /**
    * @description: adds user to a group of id 'groupId'
    * @param {String} groupId
    * @param {String} username
    * @return {Object} updatedData
    */

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

    /**
    * @description: removes user from a group of id 'groupId'
    * @param {String} groupId
    * @param {String} username
    * @return {Object} updatedData
    */

  }, {
    key: 'removeUserFromGroup',
    value: function removeUserFromGroup(groupId, username) {
      var _this3 = this;

      this.group.find({ where: { id: groupId } }).then(function (group) {
        var newMembers = group.groupmembers.filter(function (element) {
          return element !== username;
        });
        _this3.group.update({ groupmembers: newMembers }, { where: { id: groupId } });
      });
    }
    /**
    * @description: delete a group using the username
    * @param {String} groupName
    * @return {Object} deletedData
    */

  }, {
    key: 'deleteGroup',
    value: function deleteGroup(groupName) {
      this.group.destroy({ where: { groupname: groupName } });
    }
  }]);

  return GroupClass;
}();

exports.default = GroupClass;