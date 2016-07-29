const supertest = require('supertest-as-promised');
const expect = require('chai').expect;

const Trainer = require('../../lib/models/trainer');
const server = require('../../lib/server');

describe('/api/trainer', () => {
  beforeEach(function() {
    return new Trainer({
      name: 'Gio',
      photo: 'https://avatars3.githubusercontent.com/u/441646?v=3&s=460',
    }).save()
      .then((trainer) => {
        this.id = trainer.id;
      });
  });

  afterEach(() => Trainer.remove({}));

  describe('GET', () => {
    it('Get existing trainer', function() {
      return supertest(server)
        .get(`/api/trainer/${this.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Gio');
          expect(res.body.photo).to.equal('https://avatars3.githubusercontent.com/u/441646?v=3&s=460');
        });
    });

    it('List all trainer', () => (
      supertest(server)
        .get('/api/trainer/all')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.be.a('array');
        })
    ));

    it('Get trainer that does not exist', () => (
      supertest(server)
        .get('/api/trainer/IAmNotAValidId')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        })
    ));

    it('Get trainer without sending id', () => (
      supertest(server)
        .get('/api/trainer')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No trainer id sent',
        })
    ));
  });

  describe('PUT', () => {
    it('Update existing trainer', function() {
      return supertest(server)
        .put(`/api/trainer/${this.id}`)
        .send({
          name: 'Giovanni d\'Amelio',
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Giovanni d\'Amelio');
          expect(res.body.photo).to.equal('https://avatars3.githubusercontent.com/u/441646?v=3&s=460');
        });
    });

    it('Update trainer that does not exist', () => (
      supertest(server)
        .put('/api/trainer/HahaIDoNotExist')
        .send({
          height: 9001,
        })
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        })
    ));

    it('Update trainer without sending id', () => (
      supertest(server)
        .put('/api/trainer')
        .send({
          height: 9001,
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No trainer id sent',
        })
    ));
  });

  describe('POST', () => {
    it('Create new trainer', () => (
      supertest(server)
        .post('/api/trainer')
        .send({
          name: 'Tracey Radcliffe',
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).to.equal('Tracey Radcliffe');
        })
    ));

    it('Create new trainer without enough data', () => (
      supertest(server)
        .post('/api/trainer')
        .send({
          photo: 'HAHA.jpg',
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          error: 'Insufficent data to create new trainer',
        })
    ));
  });

  describe('DELETE', () => {
    it('Delete existing trainer', function() {
      return supertest(server)
        .delete(`/api/trainer/${this.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Gio');
        });
    });

    it('Delete trainer that does not exist', () => (
      supertest(server)
        .delete('/api/trainer/IAmNotAnId')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        })
    ));

    it('Delete trainer without sending id', () => (
      supertest(server)
        .delete('/api/trainer')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No trainer id sent',
        })
    ));
  });
});
