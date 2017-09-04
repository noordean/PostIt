
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('ReadMessages', [{
      groupId: 6,
      userId: 1,
      messageId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('ReadMessages', null, {});
  }
};
