import model from '../models/userModel';

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
 * @return {Object} savedData
 */
  saveUser(username, password, email) {
    this.user.sync({ force: true }).then(() => {
      return this.user.create({
        username,
        password,
        email
      }).catch((err) => {
        throw new Error(err);
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
      done(data)
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
      done(data)
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
