var mongoose = require('mongoose');
var User = require('../server/models/users');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('/POST documents', () => {
  var token;

  beforeEach((done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        username: 'sylvia',
        password: 'sylvia'
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        token = res.body.token;
        done();
      });
  });

  it('should post documents', () => {
    var document = {
      title: 'Holla',
      content: 'Just saying hi',
      accessType: 'public',
      genre: 'reality',
      createdAt: '20-2-1203'
    };
    chai.request(server)
      .post('/documents')
      .set('x-access-token', token)
      .send(document)
      .end((err, res) => {
        if (err) return err;
        res.should.have.status(200);
      });
  });
});
