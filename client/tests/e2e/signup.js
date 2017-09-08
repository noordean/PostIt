const faker = require('faker');

const email = faker.internet.email();
const username = faker.name.firstName();
module.exports = {
  'Users should be a able to signup and receive a link to login': (browser) => {
    browser
      .url('http://localhost:3333/signup')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=usernameInput]', `${username}ad`)
      .setValue('input[name=emailInput]', email)
      .setValue('input[name=phoneInput]', Math.floor(Math.random() * 100000000000))
      .setValue('input[name=passwordInput]', 'faker123')
      .setValue('input[name=confirmPasswordInput]', 'faker123')
      .click('.signup-btn')
      .waitForElementVisible('.signup-link', 5000)
      .pause(3000)
      .waitForElementVisible('.signin-link', 5000)
      .click('.signin-link')
      .end();
  },
};
