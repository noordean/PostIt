import axios from 'axios';
import chai from 'chai';

import authorization from '../../utils/authorization';

const should = chai.should();
describe('Authorization', () => {
  it('should set token in the headers', (done) => {
    const token = 'my token';
    authorization(token);
    axios.defaults.headers.common.token.should.equal('my token');
    done();
  });
});
