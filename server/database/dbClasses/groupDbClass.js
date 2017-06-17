import model from '../models/groupModel';

class GroupClass {
  constructor(sequelize) {
    // create model for group
    this.group = model(sequelize);
  }

  createGroup(groupname, createdby) {
    const groupmembers = [];
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

  getGroup(done) {
    this.group.findAll({ where: { groupname: 'July Fellow' } }).then((group) => {
      done(group);
    });
  }
}

export default GroupClass;

