import Sequelize from 'sequelize';
import db from '../models';

const validationError = Sequelize.ValidationError;
const Group = db.Group;

/**
 * class GroupClass
 * @class
 */
export default class GroupClass {
  /**
 * @description: save group to database
 * @param {String} groupname the name of the group
 * @param {String} createdby the group creator
 * @param {String} description the group decription
 * @param {Function} done callback
 * @return {Object} insertedData
 */
  static saveGroup(groupname, createdby, description, done) {
    return Group.findOrCreate({
      where: {
        groupname
      },
      defaults: {
        createdby,
        description
      }
    }).then((group) => {
      done(group);
    }).catch((err) => {
      done({ err });
    });
  }
}
