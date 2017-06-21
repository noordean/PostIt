import supertest from 'supertest';
import app from '../server';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';

const userDbInstance = new userDbClass(sequelize);

describe('signup endpoint', () => {
  const username = 'jasmineTest1';
  const anotherUser = 'jasmineTest2';
  const thirdUser = 'jasmineTest3';
  const password = 'ibro12345';
  const email = 'ebro90@gmail.com';

  // save this user to database before every spec
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

describe('signin endpoint', () => {
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
});
