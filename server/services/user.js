import Sequelize from 'sequelize';
import db from '../models';

const validationError = Sequelize.ValidationError;
const User = db.User;
/**
 * class User
 * @class
 */
export default class UserClass {
  /**
 * @description: saves user to database
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @param {Function} done
 * @return {Object} savedData
 */
  static saveUser(username, password, email, done) {
    return User.findOrCreate({
      where: {
        username
      },
      defaults: {
        password,
        email
      }
    }).then((user) => {
      done(user);
    }).catch((err) => {
      if (err instanceof validationError) {
        if (err.errors[0].message === '') {
          done(`${err.errors[0].path} must be supplied`);
        } else {
          done(err.errors[0].message);
        }
      } else {
        done({ err });
      }
    });
  }

  /**
 * @description: retrieves user using the username
 * @param {String} userName
 * @param {Function} done
 * @return {Object} retrievedData
 */
  static getUser(userName, done) {
    User.findAll({ where: { username: userName } }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: retrieves users using userId
 * @param {Integer} userId
 * @param {Function} done
 * @return {Object} retrievedData
 */
  static getUserById(userId, done) {
    User.findAll({ where: { id: userId } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: retrieves all users
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getAllUsers(done) {
    User.findAll({
      attributes: ['id', 'username']
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: retrieves usernames of all members with userIDs
 * @param {Number} userIDs
 * @param {Function} done
 * @return {Object} retrievedData
 */
  static getGroupUsers(userIDs, done) {
    const IDs = [];
    userIDs.forEach((user) => {
      IDs.push(user.userId);
    });
    User.findAll({
      where: { id: IDs }
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: delete a user using the username
 * @param {String} userName
 * @return {Object} deletedData
 */
  static deleteUser(userName) {
    User.destroy({ where: { username: userName } });
  }
}

