import chai from 'chai';
import user from '../../services/user';

const should = chai.should();
describe('<Unit Test>', () => {
  describe('Model User:', () => {
    describe('Method saveUser', () => {
      it('should be able to save user details', (done) => {
        user.saveUser('mUser', 'mUser1', 'mUser@gmail.com', '08123456576', (users) => {
          users.should.be.a('array');
          users.length.should.eql(2);
          users[0].username.should.eql('mUser');
          done();
        });
      });
    });

    describe('Method getUser', () => {
      it('should be able to get an exisiting user', (done) => {
        user.getUser('existing', (users) => {
          users.should.be.a('array');
          users[0].username.should.eql('existing');
          users[0].email.should.eql('existing@gmail.com');
          done();
        });
      });
      it('should be able to return empty array if user is not found', (done) => {
        user.getUser('notExist', (users) => {
          users.should.be.a('array');
          users.length.should.eql(0);
          done();
        });
      });
    });
    describe('Method getUserById', () => {
      it('should be able to get a user by id', (done) => {
        user.getUserById(1, (users) => {
          users.should.be.a('array');
          users[0].username.should.eql('existing');
          users[0].email.should.eql('existing@gmail.com');
          done();
        });
      });
      it('should be able to return empty array if the id is invalid', (done) => {
        user.getUserById(1327, (users) => {
          users.should.be.a('array');
          users.length.should.eql(0);
          done();
        });
      });
    });
    describe('Method deleteUser', () => {
      it('should be able delete a user', (done) => {
        user.deleteUser('mUser', (users) => {
          users.should.eql(1);
          done();
        });
      });
    });
  });
});
