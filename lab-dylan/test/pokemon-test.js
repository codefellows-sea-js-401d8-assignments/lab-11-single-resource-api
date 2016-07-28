'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const mongoose = require('mongoose');
const Pokemon = require('../model/pokemon');
var app = require('../server');
let server;

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('Test crud', () => {
  before((done) => {
    server = app.listen(3000, () => {
      console.log('server up on 3000');
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should POST', (done) => {
    request('localhost:3000')
      .post('/api/pokemon')
      .send({
        name: 'bulbachu',
        element: 'mixed',
        number: 3
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.status).to.eql(200);
        done();
      });
  });
});

describe('CRUD U Test', () => {
  let testPokemon;
  before((done) => {
    server = app.listen(3000, () => {console.log('Server up on 3000');
    });
    testPokemon = Pokemon({name:'clepuff', type:'fairy', number:37});
    testPokemon.save((err, pokemon) => {
      expect(testPokemon).to.be.a(pokemon);
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should GET a pokemon', (done) => {
    request('localhost:3000')
      .get('/api/pokemon/' + testPokemon._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('clepuff');
        expect(res.body.type).to.eql('fairy');
        expect(res.body.number).to.eql(37);
        done();
      });
  });
});
