export default {
  // signup values
  validRegUser: {
    username: 'noordean',
    email: 'noordean@gmail.com',
    password: 'ibro12345'
  },
  regUserWithInvalidEmail: {
    username: 'noordean',
    email: 'noordean@gmail',
    password: 'ibro12345'
  },
  regUserWithWrongPassword: {
    username: 'noordean',
    email: 'noordean@gmail.com',
    password: 'ibro'
  },
  regUserWithWrongUsername: {
    username: 'noordean567',
    email: 'noordean@gmail.com',
    password: 'ibro12345'
  },
  regUserWithShortUsername: {
    username: 'no56',
    email: 'noordean@gmail.com',
    password: 'ibro12345'
  },
  regUserWithShortPassword: {
    username: 'noordean',
    email: 'noordean@gmail.com',
    password: 'ibr1'
  },
  alreadyRegisteredUser: {
    username: 'nurudeen',
    email: 'nurudeen@gmail.com',
    password: 'ibro12345'
  },
  regUserWithNoUsername: {
    email: 'noordeen@gmail.com',
    password: 'ibro12345'
  },
  regUserWithNoPassword: {
    username: 'noordeen',
    email: 'noordeen@gmail.com',
  },
  regUserWithNoEmail: {
    username: 'noordeen',
    password: 'ibro12345'
  },
  // login values
  loginUserWithNoUsername: {
    password: 'ibro12345'
  },
  loginUserWithNoPassword: {
    username: 'noordean'
  },
  loginInvalidUser: {
    username: 'invalid',
    password: 'ibro12345'
  },
  loginUserWithIncorrectPassword: {
    username: 'nurudeen',
    password: 'wrong12345'
  },
  loginUserWithcorrectPassword: {
    username: 'nurudeen',
    password: 'ibro12345'
  },
  // create-group values
  createGroupWithEmptyGroupname: {
    groupName: '',
    token: 'sometoken'
  },
  createGroupWithNoGroupname: {

  }
};
