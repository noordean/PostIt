import chai from 'chai';

import message from '../../services/Message';

const should = chai.should();
describe('<Unit Test>', () => {
  describe('Model Message:', () => {
    describe('Method postMessage', () => {
      it('should be able to save message', (done) => {
        message.postMessage(3, 'mrNoName', 'new msg', 'Critical', (msg) => {
          console.log(msg);
          console.log('check here');
          msg.should.be.a('object');
          msg.dataValues.postedby.should.eql('mrNoName');
          msg.dataValues.message.should.eql('new msg');
          done();
        });
      });
    });
    describe('Method getMessage', () => {
      it('should be able to return empty array if the id is invalid', (done) => {
        message.getMessageById(1327, (msg) => {
          msg.should.be.a('array');
          msg.length.should.eql(0);
          done();
        });
      });
      it('should be able to delete a message by messageId', (done) => {
        message.deleteMessage(2, (msg) => {
          msg.should.eql(1);
          done();
        });
      });
    });
  });
});

