var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');

chai.use(chaiHttp);
var token;
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
        username: 'risper',
        firstName: 'risper',
        lastName: 'kimani',
        email: 'risper@gmail.com',
        password: 'risper',
        role: 'user'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.user.should.have.property('name');
          res.body.user.should.have.property('role').eql('user' || 'admin');
          res.body.user.should.have.property('role').eql(user.role);
          done();
        });
    });

    it('should ensure a new user created is unique', () => {
      var user = {
        username: 'jacky',
        firstName: 'jacky',
        lastName: 'kimani',
        email: 'jacky@gmail.com',
        password: 'jacky',
        role: 'user'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('User already exists');
        });
    });

    it('should ensure all users created have a role', () => {
      var user = {
        username: 'jacky',
        firstName: 'jacky',
        lastName: 'kimani',
        email: 'jacky@gmail.com',
        password: 'jacky'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('errors');
        });
    });

    it('should ensure users created have a first name and a last name', () => {
      var user = {
        username: 'jacky',
        email: 'jacky@gmail.com',
        password: 'jacky',
        role: 'user'
      };
      chai.request(server)
        .post('/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.have.property('errors');
        });
    });

    describe('/GET', () => {
      it('should get all users', () => {
        chai.request(server)
          .get('/users')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.length.should.be.eql(5);
          });
      });
    });
  });
});

describe('Authorization test', () => {
  beforeEach((done) => {
    chai.request(server)
      .post('/users/login')
      .send({
        username: 'jacky',
        password: 'jacky'
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
        }
        token = res.body.token;
        done();
      });
  });

  it('should ensure a user cannot get users without being an admin', (done) => {
    chai.request(server)
      .get('/users')
      .set('x-access-token', token)
      .end(function(err, res) {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('You do not have permission');
        done();
      });
  });
});
