import chai from 'chai';
import sequelize from '../database/dbconnection/connection';
import userDbClass from '../database/dbClasses/userDbClass';
import groupDbClass from '../database/dbClasses/groupDbClass';
import messageDbClass from '../database/dbClasses/messageDbClass';

const should = chai.should();
const userDbInstance = new userDbClass(sequelize);
const groupDbInstance = new groupDbClass(sequelize);
const messageDbInstance = new messageDbClass(sequelize);

describe('<Unit Test>', () => {
  describe('Model User:', () => {
    afterEach((done) => {
      userDbInstance.deleteUser('example');
      done();
    });
    describe('Method saveUser', () => {
      it('should be able to save whithout problems', (done) => {
        userDbInstance.saveUser('example', 'example1', 'example@gmail.com', (user) => {
          user.should.be.a('array');
          user.length.should.eql(2);
          user[0].username.should.eql('example');
          done();
        });
      }).timeout(10000);
      it('should be able to return an error if invalid data are supplied', (done) => {
        userDbInstance.saveUser('example', 'example1', 'invalidEmail@', (err) => {
          err.should.be.a('string');
          done();
        });
      }).timeout(10000);
    });
  });

  describe('Model Group:', () => {
    afterEach((done) => {
      groupDbInstance.deleteGroup('group-example');
      done();
    });
    describe('Method createGroup', () => {
      it('should be able to create group whithout problems', (done) => {
        groupDbInstance.createGroup('group-example', 'example', (group) => {
          group.should.be.a('array');
          group.length.should.eql(2);
          group[0].createdby.should.eql('example');
          done();
        });
      }).timeout(10000);
      it('should be able to return error message if groupname is empty', (done) => {
        groupDbInstance.createGroup('', 'example', (err) => {
          err.should.be.a('array');
          done();
        });
      }).timeout(10000);
    });
  });
});
