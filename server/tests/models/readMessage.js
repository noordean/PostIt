
import chai from 'chai';

import readMessage from '../../services/ReadMessage';

const should = chai.should();
describe('<Unit Test>', () => {
  describe('Model ReadMessage:', () => {
    describe('Method getMessage', () => {
      it('should be able to get message from ReadMessage table', (done) => {
        readMessage.getMessages(6, 1, (msg) => {
          msg.should.be.a('array');
          msg.length.should.eql(1);
          msg[0].userId.should.eql(1);
          done();
        });
      });
    });
  });
});
