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

  it('should update documents', () => {
    chai.request(server)
      .put('/documents/57ea31a8b9b2a908071ed937')
      .set('x-access-token', token)
      .send({
        content: 'My updated document'
      })
      .end((err, res) => {
        if (err) return err;
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Document successfully updated');
      });
  });

  it('should delete documents', () => {
    chai.request(server)
      .delete('/documents/57ea31a8b9b2a908071ed937')
      .set('x-access-token', token)
      .end((err, res) => {
        if (err) return err;
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Document deleted successfully');
      });
  });

  // it('should ensure documents have published date', () => {
  //   chai.request(server)
  //     .post('/documents')
  //     .set('x-access-token', token)
  //     .send({
  //       content: 'My updated document'
  //     })
  //     .end((err, res) => {
  //       if (err) return err;
  //       res.should.have.status(100);
  //       res.body.should.have.property('message').eql('Document successfully deleted');
  //     });
  // });

  it('should return all documents with the specified limit');
  it('should return the documents with pagination');
  it('should return all documents in the order of the published dates');
});
