
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [{
      groupname: 'New Group',
      createdby: 'existing',
      description: 'just another one',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
