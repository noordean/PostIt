import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../server';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';
import messageDbClass from '../database/dbClasses/messageDbClass';

dotenv.config();

const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);
const messageDbInstance = new messageDbClass(sequelize);

describe('Endpoint: signup', () => {
  const username = 'jasmineTest1';
  const anotherUser = 'jasmineTest2';
  const thirdUser = 'jasmineTest3';
  const password = 'ibro12345';
  const email = 'ebro90@gmail.com';

  // save this user to database before test suite
  beforeAll(() => {
    userDbInstance.saveUser(username, password, email);
  });

  // delete this user from database after every spec
  afterEach(() => {
    userDbInstance.deleteUser(username);
    userDbInstance.deleteUser(anotherUser);
  });

  it('should return an error message if username is undefined', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ password, email })
      .expect({ message: 'You need to provide username, password and email' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if password is undefined', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username, email })
      .expect({ message: 'You need to provide username, password and email' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if email is undefined', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username, password })
      .expect({ message: 'You need to provide username, password and email' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if username is empty', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username: '', password, email })
      .expect({ message: 'Username, password or email cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if email is empty', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username, password, email: '' })
      .expect({ message: 'Username, password or email cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if password is empty', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username, password: '', email })
      .expect({ message: 'Username, password or email cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return a success message if username, password and email are supplied', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username: anotherUser, password, email })
      .expect({ message: 'Registration successful' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);

  it('should return an error message if a user has already registered', (done) => {
    supertest(app)
      .post('/api/user/signup')
      .send({ username: thirdUser, password, email })
      .expect({ message: 'You already have an existing account. Kindly go and login' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);
});

describe('Endpoint: signin', () => {
  const username = 'jasmineTest1';
  const password = 'ibro12345';

  it('should return an error message if username is undefined', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ password })
      .expect({ message: 'You need to provide username and password' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if password is undefined', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ username })
      .expect({ message: 'You need to provide username and password' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if username is empty', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ username: '', password })
      .expect({ message: 'Username and password cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if passwords is empty', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ username, password: '' })
      .expect({ message: 'Username and password cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if a user is invalid', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ username: 'invalidUser', password: 'invalid12345' })
      .expect({ message: 'Invalid user!' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);

  it('should return a success message for a valid user', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ username: 'success', password: process.env.SUCCESS_PASSWORD })
      .expect({ message: 'You are now logged in', user: 'success' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);

  it('should return an error message for a wrong password', (done) => {
    supertest(app)
      .post('/api/user/signin')
      .send({ username: 'success', password: 'wrong123' })
      .expect({ message: 'Incorrect password' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);
});

describe('Endpoint: create-group', () => {
  const groupName = 'Cohort-22';
  const createdBy = 'Ibrahim';
  const groupSuccess = 'Group-Testing';
  const userSuccess = 'success';
  // create this group into database before test suite
  beforeAll(() => {
    groupDbInstance.createGroup(groupSuccess, userSuccess);
  });

  // delete this group from database after each spec
  afterEach(() => {
    groupDbInstance.deleteGroup(groupSuccess);
  });
  it('should return an error message if groupName is undefined', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupName })
      .expect({ message: 'You need to provide the group-name and the creator\'s username' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if createdBy is undefined', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ createdBy })
      .expect({ message: 'You need to provide the group-name and the creator\'s username' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if groupName is empty', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupName: '', createdBy })
      .expect({ message: 'group-name and the creator\'s username cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if createdBy is empty', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupName, createdBy: '' })
      .expect({ message: 'group-name and the creator\'s username cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if the group is already existing', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupName, createdBy })
      .expect({ message: 'The selected group name is unavailable' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if the user has not logged in', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupName: 'something', createdBy: 'noordean' })
      .expect({ message: 'Access denied!. Kindly login before creating group' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});

describe('Endpoint: add user to group', () => {
  it('should return an error message if username is undefined', (done) => {
    supertest(app)
      .post('/api/group/:groupID/user')
      .send({ username: undefined })
      .expect({ message: 'You need to provide the group-id and the username' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if username is empty', (done) => {
    supertest(app)
      .post('/api/group/:groupID/user')
      .send({ username: '' })
      .expect({ message: 'group-id and username cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return invalid group id if an invalid id is supplied ', (done) => {
    supertest(app)
      .post('/api/group/5156531/user')
      .send({ username: 'noordean' })
      .expect({ message: 'Invalid group id' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if user has not logged in ', (done) => {
    supertest(app)
      .post('/api/group/3/user')
      .send({ username: 'noordean' })
      .expect({ message: 'Access denied!. Kindly login before adding user' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});

describe('Endpoint: post message to group', () => {
  const message = 'This is an announcement';
  const postedBy = 'noordean';

  // delete this message after every spec
  afterAll(() => {
    messageDbInstance.deleteMessage(postedBy);
  });
  it('should return an error message if postedby is undefined', (done) => {
    supertest(app)
      .post('/api/group/:groupID/message')
      .send({ message })
      .expect({ message: 'You need to provide the group-id, postedBy and message' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if message is undefined', (done) => {
    supertest(app)
      .post('/api/group/:groupID/message')
      .send({ postedBy })
      .expect({ message: 'You need to provide the group-id, postedBy and message' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if postedby is empty', (done) => {
    supertest(app)
      .post('/api/group/:groupID/message')
      .send({ message, postedBy: '' })
      .expect({ message: 'group-id, user or message cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if message is empty', (done) => {
    supertest(app)
      .post('/api/group/:groupID/message')
      .send({ message: '', postedBy })
      .expect({ message: 'group-id, user or message cannot be empty' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return an error message if user has not logged in', (done) => {
    supertest(app)
      .post('/api/group/:groupID/message')
      .send({ message: 'something', postedBy: 'noordean' })
      .expect({ message: 'Access denied!. Kindly login before posting message' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return a success message if groupID, message and postedby are supplied', (done) => {
    supertest(app)
      .post('/api/group/27/message')
      .send({ message, postedBy: 'success' })
      .expect({ message: 'Message posted successfully' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });
});

describe('Endpoint: get messages from group', () => {
  it('should return messages of a group if correct groupID is supplied', (done) => {
    supertest(app)
      .get('/api/group/1/messages')
      .send({})
      .end((err, res) => {
        expect(res.status).toEqual(200);
        expect(JSON.parse(res.text)[0].postedby).toEqual('Testing');
        expect(JSON.parse(res.text)[0].message).toEqual('This is for testing');
        done();
      });
  });
});
