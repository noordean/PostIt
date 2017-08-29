
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Messages', [{
      postedby: 'existing',
      message: 'Hello guyz',
      priority: 'Critical',
      groupId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Messages', null, {});
  }
};
