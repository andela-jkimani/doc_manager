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
        res.should.have.status(200);
      });
  });

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

  it('should delete documents', () => {
    chai.request(server)
      .delete('/documents/57ea31a8b9b2a908071ed937')
      .set('x-access-token', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Document deleted successfully');
      });
  });

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
