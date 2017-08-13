import chai from 'chai';
import userDbInstance from '../services/user';
import groupDbInstance from '../services/group';

const should = chai.should();

describe('<Unit Test>', () => {
  describe('Model User:', () => {
    describe('Method saveUser', () => {
      it('should be able to save whithout problems', (done) => {
        userDbInstance.saveUser('mUser', 'mUser1', 'mUser@gmail.com', '08123456576', (user) => {
          user.should.be.a('array');
          user.length.should.eql(2);
          user[0].username.should.eql('mUser');
          done();
        });
      });
      it('should be able to return an error if invalid email is supplied', () => {
        userDbInstance.saveUser('example', 'example1', 'invalidEmail', '08123456576', (err) => {
          err.should.be.a('string');
        });
      });
      it('should be able to return an error if invalid username is supplied', () => {
        userDbInstance.saveUser('example123', 'example1', 'invalidEmail@gmail.com', '08123346576', (err) => {
          err.should.be.a('string');
        });
      });
      it('should be able to return an error if invalid password is supplied', () => {
        userDbInstance.saveUser('example123', 'example', 'invalidEmail@gmail.com', '08123456576', (err) => {
          err.should.be.a('string');
        });
      });
    });

    describe('Method getUser', () => {
      it('should be able to get an exisiting user', (done) => {
        userDbInstance.getUser('existing', (user) => {
          user.should.be.a('array');
          user[0].username.should.eql('existing');
          done();
        });
      });
      it('should be able to return empty array if user is not found', (done) => {
        userDbInstance.getUser('notExist', (user) => {
          user.should.be.a('array');
          user.length.should.eql(0);
          done();
        });
      });
    });
  });

  describe('Model Group:', () => {
    describe('Method saveGroup', () => {
      it('should be able to create group whithout problems', (done) => {
        groupDbInstance.saveGroup('group-example', 'mrNoName', 'for test..', (group) => {
          group.should.be.a('array');
          group[0].createdby.should.eql('mrNoName');
          group[0].groupname.should.eql('group-example');
          done();
        });
      });
    });
  });
});
