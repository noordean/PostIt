import Sequelize from 'sequelize';
import model from '../models/userModel';

const validationError = Sequelize.ValidationError;
/**
 * Message class
 * @class
 */
class UserClass {
/**
 * @description: having the model 'user' as an object property
 * @param {object} sequelize
 * @constructor
 */
  constructor(sequelize) {
    this.user = model(sequelize);
  }

  /**
 * @description: saves user to database
 * @param {String} username
 * @param {String} password
 * @param {String} email
 * @param {Function} done
 * @return {Object} savedData
 */
  saveUser(username, password, email, done) {
    this.user.sync({}).then(() => {
      return this.user.findOrCreate({
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
          throw new Error(err);
        }
      });
    });
  }

  /**
 * @description: retrieves user using the username
 * @param {String} userName
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getUser(userName, done) {
    this.user.findAll({ where: { username: userName } }).then((data) => {
      done(data);
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /**
 * @description: retrieves all users
 * @param {Function} done
 * @return {Object} retrievedData
 */
  getAllUsers(done) {
    this.user.findAll({}).then((data) => {
      done(data);
    }).catch((err) => {
      throw new Error(err);
    });
  }

  /**
 * @description: delete a user using the username
 * @param {String} userName
 * @return {Object} deletedData
 */
  deleteUser(userName) {
    this.user.destroy({ where: { username: userName } });
  }
}

export default UserClass;
