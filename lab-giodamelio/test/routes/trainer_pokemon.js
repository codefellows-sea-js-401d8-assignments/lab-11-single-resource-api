const supertest = require('supertest-as-promised');
const expect = require('chai').expect;

const Trainer = require('../../lib/models/trainer');
const Pokemon = require('../../lib/models/pokemon');
const server = require('../../lib/server');

describe('/api/trainer/:id/pokemon', () => {
  beforeEach(function() {
    return new Trainer({
      name: 'Gio',
      photo: 'https://avatars3.githubusercontent.com/u/441646?v=3&s=460',
    }).save()
      .then((trainer) => {
        this.trainerId = trainer.id;

        return new Pokemon({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
          trainerId: trainer.id,
        }).save()
          .then((trainedPokemon) => {
            this.trainedPokemonId = trainedPokemon.id;

            return new Pokemon({
              name: 'Metapod',
              number: 11,
              height: 7,
            }).save()
              .then((untrainedPokemon) => {
                this.untrainedPokemonId = untrainedPokemon.id;
              });
          });
      });
  });

  afterEach(() => Promise.all([
    Trainer.remove({}),
    Pokemon.remove({}),
  ]));

  describe('GET', () => {
    it('List a trainers pokemon', function() {
      return supertest(server)
        .get(`/api/trainer/${this.trainerId}/pokemon`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body).to.be.a('array');
        });
    });

    it('List the pokemon of a trainer that does not exist', () => (
      supertest(server)
        .get('/api/trainer/579bc4c4fef906ad211ad7ad/pokemon')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect({
          error: "Trainer with id '579bc4c4fef906ad211ad7ad' does not exist",
        })
    ));

    it('List the pokemon of a trainer with an invalid id', () => (
      supertest(server)
        .get('/api/trainer/IAmNotAValidId/pokemon')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect({
          error: "Trainer with id 'IAmNotAValidId' does not exist",
        })
    ));
  });

  describe('PUT', () => {
    it('Add a pokemon to a trainer', function() {
      return supertest(server)
        .put(`/api/trainer/${this.trainerId}/pokemon/${this.untrainedPokemonId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Metapod');
          expect(res.body.number).to.equal(11);
          expect(res.body.height).to.equal(7);
        });
    });

    it('Add a pokemon to a trainer that does not exist', function() {
      return supertest(server)
        .put(`/api/trainer/${this.trainerId}/pokemon/IAmNotAPokemon`)
        .expect(404)
        .expect('Content-Type', /json/)
        .expect({
          error: "Pokemon with id 'IAmNotAPokemon' does not exist",
        });
    });
  });

  describe('POST', () => {
    it('Create new pokemon', function() {
      return supertest(server)
        .post(`/api/trainer/${this.trainerId}/pokemon`)
        .send({
          name: 'Ivysaur',
          number: 2,
          height: 10,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(res.body.trainerId).to.equal(this.trainerId);
          expect(res.body.name).to.equal('Ivysaur');
          expect(res.body.number).to.equal(2);
          expect(res.body.height).to.equal(10);
        });
    });

    it('Create new pokemon without enough data', function() {
      return supertest(server)
        .post(`/api/trainer/${this.trainerId}/pokemon`)
        .send({
          name: 'Bulbasaur',
          number: 1,
        })
        .expect('Content-Type', /json/)
        .expect(400)
        .expect({
          error: 'Insufficent data to create new pokemon',
        });
    });
  });

  describe('DELETE', () => {
    it('Remove a pokemon from a trainer', function() {
      return supertest(server)
        .delete(`/api/trainer/${this.trainerId}/pokemon/${this.trainedPokemonId}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        });
    });

    it('Delete pokemon that does not exist', function() {
      return supertest(server)
        .delete(`/api/trainer/${this.trainerId}/pokemon/IAmNotAPokemon`)
        .expect(404)
        .expect('Content-Type', /json/)
        .expect({
          error: "Pokemon with id 'IAmNotAPokemon' does not exist",
        });
    });
  });
});
