var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('Documents', () => {
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

  describe('/POST documents', () => {
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
          res.should.have.status(201);
        });
    });

    it('should not post documents with the same title', () => {
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
          res.should.have.status(409);
          res.body.should.have.property('message').eql('Document title already exists');
        });
    });
  });

  describe('/PUT documents', () => {
    it('should update documents', () => {
      chai.request(server)
        .put('/documents/57ea31a8b9b2a908071ed937')
        .set('x-access-token', token)
        .send({
          content: 'My updated document'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Document successfully updated');
        });
    });
  });

  describe('/DELETE documents', () => {
    it('should delete documents', () => {
      chai.request(server)
        .delete('/documents/57ea31a8b9b2a908071ed937')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Document deleted successfully');
        });
    });
  });

  describe('/GET documents', () => {
    it('should ensure documents have a published date', () => {
      chai.request(server)
        .get('/documents')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('createdAt');
        });
    });

    it('should return all documents with the specified limit', (done) => {
      chai.request(server)
        .get('/documents/?limit=1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.length.should.eql(1);
          done();
        });
    });

    it('should return all documents with a limit and an offset', (done) => {
      chai.request(server)
        .get('/documents/?limit=1&skip=2')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body.length.should.eql(1);
          res.body[0].should.have.property('_id').eql('57ea342d78f740088918f6b8');
          res.body[0].should.have.property('createdAt');
          done();
        });
    });

    it('should return all documents in the order of the published dates', () => {
      chai.request(server)
        .get('/documents')
        .set('x-access-token', token)
        .end((err, res) => {
          res.body[0].should.have.property('_id').eql('57ea33374031bd086d7d3809');
          res.body[3].should.have.property('_id').eql('57ea326a3f2e3408554e8f5a');
          res.body[0].should.have.property('createdAt').above(res.body[1].createdAt);
          res.body[1].should.have.property('createdAt').above(res.body[2].createdAt);
          res.body[2].should.have.property('createdAt').above(res.body[3].createdAt);
        });
    });

    it('should return all documents created on a certain date with a limit', () => {
      chai.request(server)
        .get('/search?date=12-02-1993')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.have.property('_id').eql('57ea326a3f2e3408554e8f5a');
        });
    });
  });
});

describe('Owner test', () => {
  var token;

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

  it('should ensure a user cannot get documents without access', (done) => {
    chai.request(server)
      .get('/documents/57ea326a3f2e3408554e8f5a')
      .set('x-access-token', token)
      .end(function(err, res) {
        res.body.should.have.property('message').eql('Not authorized to view');
        done();
      });
  });
});
