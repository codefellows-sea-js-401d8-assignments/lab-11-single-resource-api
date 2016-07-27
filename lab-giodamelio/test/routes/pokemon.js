const supertest = require('supertest-as-promised');
const expect = require('chai').expect;
const shortid = require('shortid');

process.env.DEBUG = ''; // Hide debug messages during the tests
process.env.NODE_ENV = 'testing'; // Hide morgan routes

const server = require('../../lib/server');

describe('Route - Pokemon', () => {
  describe('GET', () => {
    before(function() {
      this.server = supertest.agent(server);
      return this.server
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
        })
        .then((res) => {
          this.id = res.body.id;
        });
    });

    it('Get existing pokemon', function() {
      return this.server
        .get(`/api/pokemon/${this.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(shortid.isValid(res.body.id)).to.be.true;
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        });
    });

    it('List all pokemon', function() {
      return this.server
        .get('/api/pokemon/all')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.be.a('array');
        });
    });

    it('Get pokemon that does not exist', function() {
      return this.server
        .get('/api/pokemon/IAmNotAValidId')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        });
    });

    it('Get pokemon without sending id', function() {
      return this.server
        .get('/api/pokemon')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No pokemon id sent',
        });
    });
  });

  describe('PUT', () => {
    before(function() {
      this.server = supertest.agent(server);
      return this.server
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
        })
        .then((res) => {
          this.id = res.body.id;
        });
    });

    it('Update existing pokemon', function() {
      return this.server
        .put(`/api/pokemon/${this.id}`)
        .send({
          height: 9001,
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(shortid.isValid(res.body.id)).to.be.true;
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(9001);
        });
    });

    it('Update pokemon that does not exist', function() {
      return this.server
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
        });
    });

    it('Update pokemon without sending id', function() {
      return this.server
        .put('/api/pokemon')
        .send({
          height: 9001,
        })
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No pokemon id sent',
        });
    });
  });

  describe('POST', () => {
    it('Create new pokemon', () => (
      supertest(server)
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(shortid.isValid(res.body.id)).to.be.true;
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
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
    before(function() {
      this.server = supertest.agent(server);
      return this.server
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
        })
        .then((res) => {
          this.id = res.body.id;
        });
    });

    it('Delete existing pokemon', function() {
      return this.server
        .delete(`/api/pokemon/${this.id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(shortid.isValid(res.body.id)).to.be.true;
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        });
    });

    it('Delete pokemon that does not exist', function() {
      return this.server
        .delete('/api/pokemon/IAmNotAnId')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.exist;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.match(/does not exist/);
        });
    });

    it('Delete pokemon without sending id', function() {
      return this.server
        .delete('/api/pokemon')
        .expect(400)
        .expect('Content-Type', /json/)
        .expect({
          error: 'No pokemon id sent',
        });
    });
  });
});
