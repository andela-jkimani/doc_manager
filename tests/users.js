var mongoose = require('mongoose');
var User = require('../server/models/users');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
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

// Testing the GET route
  describe('/GET users', () => {
    it('it should GET no users when database is empty', (done) => {
      User.remove({}, () => {
        console.log('All users removed');
      });
      chai.request(server)
          .get('/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/POST', () => {
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

    it('should create a user', (done) => {
      var user = {
        username: 'jkggie',
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

    it('should ensure users created are unique');
    it('should ensure all users created have a role');
    it('should ensure users created have a first name and a last name');
    it('should get all users');
    it('should get all users with a specific role');
  });
});
