'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const request = require('chai').request;
const mongoose = require('mongoose');
const serverPort = 9000;
// const Pokemon = require('../model/pokemon');

describe('routing', function() {
  var server;
  before((done) => {
    server = require('../_server');
    done();
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {});
    server.close();
    done();
  });

  it('Should handle unregistered GET requests', function(done) {
    request('localhost:' + serverPort)
    .get('/api/undefinedRoute')
    .end(function(err){
      expect(err).to.have.status(400);
      done();
    });
  });

  it('Should handle registered GET requests', function(done) {
    request('localhost:' + serverPort)
    .get('/api/pokemon/dataGoesHere')
    .end(function(err, res){
      expect(res).to.have.status(200);
      done();
    });
  });

  // describe('routing with data present', () => {
  //   let testPokemon;
  //   before((done) => {
  //     testPokemon = Pokemon({
  //       pokeName: 'test Pokemon',
  //       pokeType: 'test Type'
  //     });
  //     testPokemon.save((err, pokemon) => {
  //       testPokemon = pokemon;
  //       done();
  //     });
  //   });
  //   it('should GET a single pokemon', (done) => {
  //     request('localhost:' + serverPort)
  //       .get('/api/pokemon/' + testPokemon._id)
  //       .end((res) => {
  //         expect(res).to.have.status(200);
  //         done();
  //       });
  //   });
  // });
});
