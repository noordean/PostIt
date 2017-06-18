import model from '../models/groupModel';

class GroupClass {
  constructor(sequelize) {
    // create model for group
    this.group = model(sequelize);
  }

  createGroup(groupname, createdby) {
    const groupmembers = [createdby];
    this.group.sync().then(() => {
      return this.group.create({
        groupname,
        createdby,
        groupmembers
      }).catch((err) => {
        throw new Error(err);
      });
    });
  }

  getGroupByName(groupName, done) {
    this.group.findAll({ where: { groupname: groupName } }).then((group) => {
      done(group);
    });
  }

  getGroupById(groupId, done) {
    this.group.findAll({ where: { id: groupId } }).then((group) => {
      done(group);
    });
  }

  addUserToGroup(groupId, username) {
    this.group.find({ where: { id: groupId } }).then((group) => {
      const newMembers = group.groupmembers;
      if (newMembers.indexOf(username) === -1) {
        newMembers.push(username);
      }
      this.group.update({ groupmembers: newMembers },
        { where: { id: groupId } });
    });
  }
}

export default GroupClass;

