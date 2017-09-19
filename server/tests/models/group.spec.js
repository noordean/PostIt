
import chai from 'chai';

import group from '../../services/Group';

const should = chai.should();
describe('<Unit Test>', () => {
  describe('Model Group:', () => {
    describe('Method saveGroup', () => {
      it('should be able to save group details', (done) => {
        group.saveGroup('group-example', 'mrNoName', 'for test..', (groups) => {
          groups.should.be.a('array');
          groups[0].createdby.should.eql('mrNoName');
          groups[0].groupname.should.eql('group-example');
          done();
        });
      });
    });
    describe('Method getGroupById', () => {
      it('should be able to get a group by id', (done) => {
        group.getGroupById(1, (groups) => {
          groups.should.be.a('array');
          groups[0].groupname.should.eql('New Group');
          groups[0].createdby.should.eql('existing');
          done();
        });
      });
      it('should be able to return empty array if the id is invalid',
        (done) => {
          group.getGroupById(1327, (groups) => {
            groups.should.be.a('array');
            groups.length.should.eql(0);
            done();
          });
        });
    });
    describe('Method deleteGroup', () => {
      it('should be able to delete a group by id', (done) => {
        group.deleteGroup(4, (groups) => {
          groups.should.eql(1);
          done();
        });
      });
    });
  });
});
