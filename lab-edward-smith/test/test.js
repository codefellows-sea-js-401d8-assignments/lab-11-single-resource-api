'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');
const Movie = require('../model/movie');
process.env.DB_SERVER = 'mongodb://localhost/test_db';
const server = require('../server');

describe('Test CRUD', function() {
  it('should response with a 404 error', function(done) {
    request('localhost:3000')
      .get('/sdfaasfd')
      .end(function(err, res) {
        expect(err).to.not.eql(null);
        expect(res).to.have.status(404);
        expect(res.text).to.eql('not found');
        done();
      });
  });
  it('should GET an array of movies', function(done){
    request('localhost:3000')
      .get('/api/movie/all')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });
  it('should POST movie', function(done) {
    request('localhost:3000')
      .post('/api/movie')
      .send({
        title: 'the shining',
        director: 'Kubrick',
        year_released: 1980
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.director).to.eql('Kubrick');
        expect(res.body).to.have.property('year_released');
        done();
      });
  });
});

describe('tests that require a movie', function() {
  let testMovie;
  before(function(done) {
    testMovie = new Movie({
      title: 'LoTR',
      director: 'Jackson',
      year_released: 2000
    });
    testMovie.save(function(err, movie){
      testMovie = movie;
      done();
    });
  });
  after(function(done){
    mongoose.connection.db.dropDatabase(function() {
      server.close();
      done();
    });
  });

  it('should get a movie', function(done) {
    request('localhost:3000')
      .get('/api/movie/' + testMovie._id)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.director).to.eql('Jackson');
        done();
      });
  });
});
