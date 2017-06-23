import supertest from 'supertest';
import dotenv from 'dotenv';
import app from '../server';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';

dotenv.config();

const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);

describe('endpoint: signup', () => {
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

describe('endpoint: signin', () => {
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
      .expect({ message: 'You are now logged in' })
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

describe('endpoint: create-group', () => {
  const groupname = 'Cohort-22';
  const createdby = 'Ibrahim';
  const groupSuccess = 'Group-Testing';
  const userSuccess = 'anonymous'
  // create this group into database before test suite
  beforeAll(() => {
    groupDbInstance.createGroup(groupSuccess, userSuccess);
  });

  // delete this user from database after test suite
  afterAll(() => {
    groupDbInstance.deleteGroup(groupSuccess);
  });
  it('should return an error message if groupName is undefined', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupname })
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
      .send({ createdby })
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
      .send({ groupname: '', createdby })
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
      .send({ groupname, createdby: '' })
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
      .send({ groupname, createdby })
      .expect({ message: 'The selected group name is unavailable' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should return a success message if valid groupname and createdby(username) are provided', (done) => {
    supertest(app)
      .post('/api/group')
      .send({ groupname: groupSuccess, createdby: userSuccess })
      .expect({ message: 'Group successfully created' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, jasmine.DEFAULT_TIMEOUT_INTERVAL + 10000);
});

describe('endpoint: add user to group', () => {
  /*const groupname = 'Cohort-22';
  const createdby = 'Ibrahim';
  const groupSuccess = 'Group-Testing';
  const userSuccess = 'anonymous'
  // create this group into database before test suite
  beforeAll(() => {
    groupDbInstance.createGroup(groupSuccess, userSuccess);
  });

  // delete this user from database after test suite
  afterAll(() => {
    groupDbInstance.deleteGroup(groupSuccess);
  });*/
  it('should return an error message if username is undefined', (done) => {
    supertest(app)
      .post('/api/group/:groupID/user')
      .send({})
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
});
