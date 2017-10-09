import axios from 'axios';
import chai from 'chai';

import Auth from '../../utils/Auth';

const should = chai.should();
describe('Authorization', () => {
  it('should set token in the headers', (done) => {
    const token = 'my token';
    Auth.setToken(token);
    axios.defaults.headers.common.token.should.equal('my token');
    done();
  });
});
