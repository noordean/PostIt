const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync('exist123', salt);
module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      username: 'existing',
      password: hashedPassword,
      email: 'existing@gmail.com',
      phoneNumber: '07012345678',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'toDelete',
      password: hashedPassword,
      email: 'toBeDelted@gmail.com',
      phoneNumber: '07032345678',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
