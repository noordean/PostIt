import model from '../models/messageModel';

class MessageClass {
  constructor(sequelize) {
    // create model for message
    this.message = model(sequelize);
  }

  postMessage(groupid, postedby, message) {
    this.message.sync().then(() => {
      return this.message.create({
        groupid,
        postedby,
        message
      }).catch((err) => {
        throw new Error(err);
      });
    });
  }

 getMessages(groupID, done) {
    this.message.findAll({ where: { groupid: groupID } }).then((data) => {
      done(data)
    }).catch((err) => {
      throw new Error(err);
    });
  }
}

export default MessageClass;
