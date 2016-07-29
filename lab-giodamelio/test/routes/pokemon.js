const supertest = require('supertest-as-promised');
const expect = require('chai').expect;

const Pokemon = require('../../lib/models/pokemon');
const server = require('../../lib/server');

describe('/api/pokemon', () => {
  beforeEach(function() {
    return new Pokemon({
      name: 'Bulbasaur',
      number: 1,
      height: 7,
    }).save()
      .then((pokemon) => {
        this.id = pokemon.id;
      });
  });

  afterEach(() => Pokemon.remove({}));

  describe('GET', () => {
    it('Get existing pokemon', function() {
      return supertest(server)
        .get(`/api/pokemon/${this.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        });
    });

    it('List all pokemon', () => (
      supertest(server)
        .get('/api/pokemon/all')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.be.a('array');
        })
    ));

    it('Get pokemon that does not exist', () => (
      supertest(server)
        .get('/api/pokemon/IAmNotAValidId')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        })
    ));

    it('Get pokemon without sending id', () => (
      supertest(server)
        .get('/api/pokemon')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No pokemon id sent',
        })
    ));
  });

  describe('PUT', () => {
    it('Update existing pokemon', function() {
      return supertest(server)
        .put(`/api/pokemon/${this.id}`)
        .send({
          height: 9001,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(9001);
        });
    });

    it('Update pokemon that does not exist', () => (
      supertest(server)
        .put('/api/pokemon/HahaIDoNotExist')
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

    it('Update pokemon without sending id', () => (
      supertest(server)
        .put('/api/pokemon')
        .send({
          height: 9001,
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No pokemon id sent',
        })
    ));
  });

  describe('POST', () => {
    it('Create new pokemon', () => (
      supertest(server)
        .post('/api/pokemon')
        .send({
          name: 'Ivysaur',
          number: 2,
          height: 10,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.name).to.equal('Ivysaur');
          expect(res.body.number).to.equal(2);
          expect(res.body.height).to.equal(10);
        })
    ));

    it('Create new pokemon without enough data', () => (
      supertest(server)
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          error: 'Insufficent data to create new pokemon',
        })
    ));
  });

  describe('DELETE', () => {
    it('Delete existing pokemon', function() {
      return supertest(server)
        .delete(`/api/pokemon/${this.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        });
    });

    it('Delete pokemon that does not exist', () => (
      supertest(server)
        .delete('/api/pokemon/IAmNotAnId')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        })
    ));

    it('Delete pokemon without sending id', () => (
      supertest(server)
        .delete('/api/pokemon')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No pokemon id sent',
        })
    ));
  });
});
