const faker = require('faker');

const title = faker.lorem.words(2);
const newTitle = faker.lorem.words(7);
const email = faker.internet.email();
const password = faker.internet.password();
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
module.exports = {
  'Create document without credentials': (browser) => {
    browser
      .url('http://localhost:3333/')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=firstName]', firstName)
      .setValue('input[name=lastName]', lastName)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .setValue('input[name=confirmPassword]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#document-header')
      .pause(1000)
      .click('#create-document')
      .pause(1000)
      .waitForElementVisible('iframe', 5000)
      .waitForElementVisible('.mce-i-code', 5000)
      .setValue('input[name=title]', '')
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', '')
      .click('.mce-floatpanel .mce-container-body button')
      .pause(3000)
      .click('#save-document')
      .pause(1000)
      .waitForElementVisible('.toast', 6000)
      .assert.containsText('.toast', 'No field should be left blank');
  },
  'User should be able to view personal and all documents':
  (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .click('select option[value="Personal"]')
      .pause(2000)
      .assert.containsText('.card-panel > h5', 'Personal Documents')
      .assert.elementNotPresent(
      '.scrollable > div > a')
      .pause(5000)
      .click('select option[value="All"]')
      .pause(2000)
      .assert.containsText('.card-panel > h5', 'All Documents')
      .assert.elementPresent(
      '.scrollable > div > a')
      .pause(5000);
  },
  'User should be able to create document successfully': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#document-header')
      .pause(1000)
      .click('#create-document')
      .pause(1000)
      .waitForElementVisible('iframe', 5000)
      .waitForElementVisible('.mce-i-code', 5000)
      .setValue('input[name=title]', title)
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .pause(3000)
      .click('#save-document')
      .pause(1000)
      .waitForElementVisible('.toast', 6000)
      .assert.containsText('.toast', 'Document Created')
      .waitForElementVisible('.document-list-view', 5000)
      .pause(5000)
      .assert.containsText('.scrollable > div > a', title);
  },
  'User should not be able to create document if title exists': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .click('#document-header')
      .pause(1000)
      .click('#create-document')
      .pause(1000)
      .waitForElementVisible('iframe', 5000)
      .waitForElementVisible('.mce-i-code', 5000)
      .setValue('input[name=title]', title)
      .click('select option[value="public"]')
      .click('.mce-i-code')
      .setValue('.mce-textbox', faker.lorem.paragraphs())
      .click('.mce-floatpanel .mce-container-body button')
      .pause(3000)
      .click('#save-document')
      .pause(1000)
      .waitForElementVisible('.toast', 6000)
      .assert
      .containsText(
      '.toast', 'Document title already exists, please rename document');
  },
  'User should search documents': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', title)
      .pause(5000)
      .assert.containsText('.scrollable > div > a', title);
  },
  'User should view document': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', title)
      .pause(5000)
      .assert.containsText('.scrollable > div > a', title)
      .click('.scrollable > div > a')
      .pause(5000)
      .click('#update-document')
      .waitForElementVisible('input', 5000)
      .clearValue('input[name=title]')
      .setValue('input[name=title]', newTitle)
      .click('select option[value="role"]')
      .pause(2000)
      .click('#save-update')
      .waitForElementVisible('.toast', 5000)
      .pause(1000)
      .assert.containsText('.toast', 'Document has been updated')
      .setValue('input[name=searchTerm]', newTitle)
      .pause(2000)
      .assert.containsText('.scrollable > div > a', newTitle);
  },
  'User should not be able to update document with existing title':
  (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', newTitle)
      .pause(5000)
      .assert.containsText('.scrollable > div > a', newTitle)
      .click('.scrollable > div > a')
      .pause(2000)
      .click('#update-document')
      .waitForElementVisible('input', 5000)
      .clearValue('input[name=title]')
      .setValue('input[name=title]', 'The Way of Kings')
      .click('select option[value="role"]')
      .pause(2000)
      .click('#save-update')
      .waitForElementVisible('.toast', 5000)
      .pause(1000)
      .assert.containsText('.toast',
      'Document title already exists, please rename document');
  },
  'User delete document': (browser) => {
    browser
      .url('http://localhost:7000/auth/signin')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', email)
      .setValue('input[name=password]', password)
      .click('.button-design')
      .waitForElementVisible('.toast', 5000)
      .assert.containsText('.toast', 'Welcome!')
      .waitForElementVisible('.side-nav', 5000)
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', newTitle)
      .pause(5000)
      .assert.containsText('.scrollable > div > a', newTitle)
      .click('.scrollable > div > a')
      .pause(2000)
      .click('#delete-document')
      .pause(2000)
      .click('#delete')
      .pause(2000)
      .waitForElementVisible('input', 5000)
      .pause(2000)
      .clearValue('input[name=searchTerm]')
      .setValue('input[name=searchTerm]', newTitle)
      .pause(5000)
      .assert.elementNotPresent('.scrollable > div > a')
      .end();
  },
};
