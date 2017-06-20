import supertest from 'supertest';
import app from '../server';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';

const userDbInstance = new userDbClass(sequelize);

describe('signup endpoint', () => {
  const username = 'noordean';
  const password = 'ibro12345';
  const email = 'ebro90@gmail.com';

  // run this query 1 second less than the jasmine default value
  beforeEach(() => {
    userDbInstance.saveUser(username, password, email);
  }, 1000);

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
      .send({ username, password, email })
      .expect({ message: 'Rgistration successful' })
      .end((err) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  }, 10000);
});
