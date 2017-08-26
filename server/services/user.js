import Sequelize from 'sequelize';
import db from '../models';

const validationError = Sequelize.ValidationError;
const Users = db.User;
/**
 * class User: interracts with User table
 * @class
 */
export default class User {
  /**
 * @description: saves user to database
 * @param {String} username username of the user
 * @param {String} password password of the user
 * @param {String} email email of the user
 * @param {String} phoneNumber phone number of the user
 * @param {Function} done callback function
 * @return {Object} savedData
 */
  static saveUser(username, password, email, phoneNumber, done) {
    return Users.findOrCreate({
      where: {
        username
      },
      defaults: {
        password,
        email,
        phoneNumber
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
 * @param {String} userName username of the user
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getUser(userName, done) {
    Users.findAll({ where: { username: userName } }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: retrieves users using userId
 * @param {Integer} userId id of the user
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getUserById(userId, done) {
    Users.findAll({ where: { id: userId } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: retrieves users using email
 * @param {Integer} email email of the user
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getUserByEmail(email, done) {
    Users.findAll({ where: { email } }).then((group) => {
      done(group);
    });
  }

  /**
 * @description: updates user's password
 * @param {string} password password of the user
 * @param {string} email email of the user
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static updatePassword(password, email, done) {
    Users.update({ password }, { where: { email } }).then((user) => {
      done(user);
    }).catch((error) => {
      done({ error });
    });
  }
  /**
 * @description: retrieves all users
 * @param {Array} usernames usernames to be excluded
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getAllUsers(usernames, done) {
    const users = usernames.split(' ');
    Users.findAll({
      where: {
        username: {
          $notIn: users
        }
      }
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: retrieves usernames of all members with userIDs
 * @param {Number} userIDs id's of the users
 * @param {Function} done callback function
 * @return {Object} retrievedData
 */
  static getGroupUsers(userIDs, done) {
    const IDs = [];
    userIDs.forEach((user) => {
      IDs.push(user.userId);
    });
    Users.findAll({
      where: { id: IDs }
    }).then((data) => {
      done(data);
    }).catch((err) => {
      done({ err });
    });
  }

  /**
 * @description: delete a user using the username
 * @param {String} userName username of the user
 * @param {Function} done callback function
 * @return {Object} deletedData
 */
  static deleteUser(userName, done) {
    Users.destroy({
      where: {
        username: userName
      }
    }).then((user) => {
      done(user);
    }).catch((err) => {
      done({ err });
    });
  }
}

