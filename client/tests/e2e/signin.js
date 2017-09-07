
module.exports = {
  'Users should be a able to signin and redirected to dashboard': (browser) => {
    browser
      .url('http://localhost:3333/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=usernameInput]', 'existing')
      .setValue('input[name=passwordInput]', 'exist123')
      .click('.login-btn')
      .pause(3000)
      .end();
  },
};
