import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';

const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);

export default class EndpointsValidation {
  signUp(username, password, email) {
    if (username === undefined || password === undefined || email === undefined) {
      return { message: 'You need to provide username, password and email' };
    } else if (username === '' || password === '' || email === '') {
      return { message: 'Username, password or email cannot be empty' };
    } else {
      userDbInstance.saveUser(username, password, email);
      return { message: 'Rgistration successful' }
    }
  }

  signIn(username, password) {
    if (username === undefined || password === undefined) {
      return { message: 'You need to provide username, password' };
    } else if (username === '' || password === '') {
      return { message: 'Username, password cannot be empty' };
    } else {
      userDbInstance.getUser(username, (user) => {
        if (user.length === 0) {
          return { message: 'Invalid user!' };
        } else {
          if (user[0].password === password) {
            return { message: 'You are now logged in' }
          }
        }
      });
    }
  }

  createGroup(groupName, createdBy) {
    if (groupName === undefined || createdBy === undefined) {
      return { message: 'You need to provide the group-name and the creator\'s username' };
    } else if (groupName === '' || createdBy === '') {
      return { message: 'group-name and the creator\'s username cannot be empty' };
    } else {
      groupDbInstance.createGroup(groupName, createdBy);
      return { message: 'Group successfully created' };
    }
  }
}
