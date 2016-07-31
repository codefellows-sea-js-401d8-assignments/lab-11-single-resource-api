'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
require('../server');

describe('test GET, PUT, and POST requests using MongoDB', function() {
  let uniqueId;
  before(function(done) {
    request('localhost:3000')
    .post('/api/hero')
    .send({name: 'sylvanas', race: 'undead', faction: 'horde'})
    .end(function(err, res) {
      if (err) throw err;
      uniqueId = res.text.substr(res.text.length - 26);
      uniqueId = uniqueId.substr(0, 24);
      done();
    });
  });
  after(function(done) {
    request('localhost:3000')
    .delete('/api/hero/' + uniqueId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res);
      done();
    });
  });
  after(function(done) {
    request('localhost:3000')
    .delete('/api/hero/' + uniqueId)
    .end();
    done();
  });
  it('/GET should respond with 404 not found for unregistered routes', function(done) {
    request('localhost:3000')
    .get('/api/wtf')
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('that page was not found');
      done();
    });
  });
  it('/GET should respond with 200 status code when valid id provided', function(done) {
    request('localhost:3000')
    .get('/api/hero/' + uniqueId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.text).to.have.string('"name":"sylvanas","race":"undead","faction":"horde"');
      done();
    });
  });
  it('/GET should respond with 404 not found error when id is not valid', function(done) {
    request('localhost:3000')
    .get('/api/hero/321')
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('that page was not found');
      done();
    });
  });

  it('/PUT should respond with 200 status code when valid body is provided', function(done) {
    request('localhost:3000')
    .put('/api/hero/' + uniqueId)
    .send({name: 'varian', race: 'human', faction: 'alliance'})
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.have.keys('__v', '_id', 'faction', 'name', 'race');
      done();
    });
  });
  it('/PUT should respond with 400 bad request error when no body provided', function(done) {
    request('localhost:3000')
    .put('/api/hero/' + uniqueId)
    .send({})
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(400);
      expect(res.text).to.eql('that\'s a bad request');
      done();
    });
  });
  it('/PUT should respond with 404 not found error when no id is found', function(done) {
    request('localhost:3000')
    .put('/api/hero/321')
    .send({name: 'james', race: 'human', faction: 'horde'})
    .end(function(err, res) {
      expect(err);
      expect(res).to.have.status(404);
      expect(res.text).to.eql('that page was not found');
      done();
    });
  });

  it('/DELETE should respond with 204 when provided with a valid id', function(done) {
    request('localhost:3000')
    .delete('/api/hero/' + uniqueId)
    .end(function(err, res) {
      expect(err).to.eql(null);
      expect(res).to.have.status(204);
      done();
    });
  });
  it('/DELETE should respond with 404 not found error when valid id but not found', function(done) {
    request('localhost:3000')
    .delete('/api/hero/321')
    .end(function(err, res) {
      expect(err);
      expect(err).to.have.status(404);
      expect(res.text).to.eql('that page was not found');
      done();
    });
  });
});
