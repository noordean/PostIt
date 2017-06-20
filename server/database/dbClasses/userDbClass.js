import model from '../models/userModel';

class UserClass {
  constructor(sequelize) {
    // create model for user
    this.user = model(sequelize);
  }

  saveUser(username, password, email) {
    this.user.sync().then(() => {
      return this.user.create({
        username,
        password,
        email
      }).catch((err) => {
        throw new Error(err);
      });
    });
  }

  getUser(userName, done) {
    this.user.findAll({ where: { username: userName } }).then((data) => {
      done(data)
    }).catch((err) => {
      throw new Error(err);
    });
  }

  deleteUser(userName) {
    this.user.destroy({ where: { username: userName } });
  }
}

export default UserClass;
