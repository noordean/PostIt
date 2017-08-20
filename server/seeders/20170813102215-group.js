
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Groups', [{
      groupname: 'New Group',
      createdby: 'existing',
      description: 'just another one',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      groupname: 'New Group-2',
      createdby: 'anodaExt',
      description: 'just another one',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      groupname: 'Third Group',
      createdby: 'third person',
      description: 'just another one',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      groupname: 'Forth Group',
      createdby: 'forth person',
      description: 'just another one',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Groups', null, {});
  }
};
