
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Notifications', [{
      userId: 1,
      groupName: 'from Seeders',
      message: 'Hello guyz',
      postedby: 'existing',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Notifications', null, {});
  }
};
