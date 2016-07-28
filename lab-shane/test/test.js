'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const port = 5000;

describe('CRUD API (with Express!) ', () => {
  let server;
  before(function(done) {
    server = require('../lib/_server.js');
    done();
  });

  after(function(done) {
    server.close();
    done();
  });


  it('test 1: should return a status code of 404 for unregistered routes', (done) => {
    request('localhost:' + port)
      .get('/')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('test 2: should return a status code of 404 for a valid request with an id that was not found', (done) => {
    request('localhost:' + port + '/api')
      .get('/pokemon/ivysaur')
      .end(function(err) {
        expect(err).to.have.status(404, 'File Not Found');
        done();
      });
  });

  it('test 3: should return a status code of 400 for requests with no id', (done) => {
    request('localhost:' + port + '/api')
      .get('/pokemon/')
      .end(function(err) {
        expect(err).to.have.status(400, 'No id provided');
        done();
      });
  });

  it('test 4: should return a status code of 200 for requests with valid id', (done) => {
    request('localhost:' + port + '/api')
      .get('/pokemon/squirtle')
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status code should be 200');
        done();
      });
  });

  it('test 5: should return a status code of 400 if no/invalid body provided for POST request', (done) => {
    request('localhost:' + port + '/api')
      .post('/pokemon/charmander')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('test 6: should return a status code of 200 if there is a valid body', (done) => {
    request('localhost:' + port + '/api')
      .post('/pokemon/charmander')
      .send({
        name: 'charmander',
        type: 'fire',
        'final evolution': 'charizard'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('test 7: should return a status code of 200 for valid PUT body', (done) => {
    request('localhost:' + port + '/api')
      .put('/pokemon/squirtle')
      .send({
        name: 'Justin Bieber',
        type: 'Pop Singer',
        'final evolution': 'off the charts',
        uuid: 'the Biebs'
      })
      .end(function(err, res) {
        expect(err).to.eql(null, 'the error should be null');
        expect(res).to.have.status(200, 'the status should be 200');
        done();
      });
  });

  it('test 8: should return a status code of 400 if no/invalid body provided for PUT request', (done) => {
    request('localhost:' + port + '/api')
      .put('/pokemon/squirtle')
      .end(function(err) {
        expect(err).to.have.status(400, 'no body provided');
        done();
      });
  });

  it('test 9: should return a status code of 404 for a valid request with an id that was not found', (done) => {
    request('localhost:' + port + '/api')
      .put('/pokemon/ivysaur')
      .send({
        name: 'Justin Bieber',
        type: 'Pop Singer',
        'final evolution': 'off the charts',
        uuid: 'the Biebs'
      })
      .end(function(err) {
        expect(err).to.have.status(404, 'the status should be 404');
        done();
      });
  });

  it('test 10: should return a status code of 400 for a valid "DELETE" request ', (done) => {
    request('localhost:' + port + '/api')
      .delete('/pokemon/squirtle')
      .end(function(err) {
        expect(err).to.have.status(400, 'the status should be 204');
        done();
      });
    request('localhost:' + port + '/api')
      .get('/pokemon/squirtle')
      .end(function(err) {
        expect(err).to.have.status(404, 'the status should be 404');
      });
  });

});
