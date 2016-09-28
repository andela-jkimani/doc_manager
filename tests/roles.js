var mongoose = require('mongoose');
var Role = require('../server/models/roles');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Roles', () => {
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
        console.log('Successfully logged in');
        done();
      });
  });

  describe('/GET role', (done) => {
    it('should return no roles when database is empty', () => {
      Role.remove({}, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Successfully removed roles');
        }
      });
      chai.request(server)
        .get('/roles')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        });
    });

    it('should return all roles in the database', () => {
      chai.request(server)
        .get('/roles')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(2);
          done();
        });
    });
  });

  describe('/POST role', () => {
    it('should post roles', () => {
      chai.request(server)
        .post('/roles')
        .set('x-access-token', token)
        .send({
          title: 'user'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.have.property('message').eql('Role created successfully');
        });
    });

    it('should not post roles with the same title', () => {
      chai.request(server)
        .post('/roles')
        .set('x-access-token', token)
        .send({
          title: 'admin'
        })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('errors');
        });
    });
  });
});
