import chaiHttp from 'chai-http';
import chai from 'chai';

import app from '../../server';

chai.use(chaiHttp);
const should = chai.should();
let sentToken = '';
describe('PostIt Endpoints', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/user/signin')
      .send({
        username: 'existing',
        password: 'exist123'
      })
      .end((err, res) => {
        sentToken = res.body.user.token;
        done();
      });
  });

  describe('DELETE api/message/:messageId', () => {
    it('should not have access to delete message if token is not supplied',
      (done) => {
        chai.request(app)
          .delete('/api/v1/message/54678')
          .send({
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('Your login token must be provided');
            done();
          });
      });
    it('should return an error message if the id supplied is not found',
      (done) => {
        chai.request(app)
          .delete('/api/v1/message/54678')
          .send({
            token: sentToken
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            res.body.message.should.be.eql('No messages found');
            done();
          });
      });
    it('should delete a message if correct messageId is supplied', (done) => {
      chai.request(app)
        .delete('/api/v1/message/1')
        .send({
          token: sentToken
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.message.should.be.eql('message deleted');
          done();
        });
    });
  });

  describe('GET api/v1/message/:messageId/user', () => {
    it('should return a success message if correct details are supplied',
      (done) => {
        chai.request(app)
          .get('/api/v1/message/4/user?groupId=6')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('users');
            res.body.users[0].username.should.be.eql('existing');
            done();
          });
      });
    it('should return an error message if the supplied messageId does not exist',
      (done) => {
        chai.request(app)
          .get('/api/v1/message/4009/user?groupId=6')
          .set('token', sentToken)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.have.property('message');
            res.body.message.should.be.eql('No users found');
            done();
          });
      });
  });
});
