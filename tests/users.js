var mongoose = require('mongoose');
var User = require('../server/models/users');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
chai.use(chaiHttp);

describe('Users', () => {
  var token;
  beforeEach((done) => {
    User.collection.drop();
    chai.request(server)
      .post('/users/login')
      .send({
        username: 'jacky',
        password: 'jacky'
      })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  // Testing the POST route
  describe('/POST users', () => {
    it('should create a user', (done) => {
      var user = {
        username: 'maggie',
        firstName: 'maggie',
        lastName: 'kimani',
        email: 'maggie@gmail.com',
        password: 'maggie',
        role: 'user'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('should not POST a user with a missing parameter', (done) => {
      var user = {
        firstName: 'jacky',
        lastName: 'kimani',
        email: 'jacky@gmail.com',
        password: 'jacky',
        role: 'admin'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('username');
          res.body.errors.username.should.have.property('kind').eql('required');
          done();
        });
    });

    it('should ensure a user has a role', (done) => {
      var user = {
        username: 'eunice',
        name: {
          firstName: 'eunice',
          lastName: 'kimani'
        },
        email: 'eunice@gmail.com',
        password: 'jacky'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .then((err, res) => {
          console.log(res);
          res.should.have.status(200);
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('role');
          res.body.errors.role.should.have.property('kind').eql('required');
          done();
        });
    });


    it('should ensure a user is unique');
    it('should ensure a user is logged in');
  });

// Testing the GET route
  describe('/GET users', () => {
    // return an array of zero length
    it('should GET no users when database is empty', (done) => {
      chai.request(server)
          .get('/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });

    it('should return all users', (done) => {
      chai.request(server)
        .get('/users')
        .then((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.should.include.keys('_id', 'username', 'name', 'email', 'password', 'role');
          done();
        });
    });
  });
});
