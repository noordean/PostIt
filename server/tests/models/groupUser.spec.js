
import chai from 'chai';

import groupUser from '../../services/GroupUser';

const should = chai.should();
describe('<Unit Test>', () => {
  describe('Model GroupUser:', () => {
    describe('Method addUser', () => {
      it('should be able to save user to GroupUser table', (done) => {
        groupUser.addUser(1, 2, (user) => {
          user.should.be.a('array');
          user[0].groupId.should.eql(1);
          user[0].userId.should.eql(2);
          done();
        });
      });
    });
  });
});
