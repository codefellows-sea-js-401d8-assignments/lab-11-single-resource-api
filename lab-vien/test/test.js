'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const mongoose = require('mongoose');

//connect to mongod
const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

const testServer = require('../server');

describe('Testing hitlist CRUD with mongodb', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      testServer.close(function() {
        mongoose.connection.close(function() {
          done();
        });
      });
    });
  });

  describe('testing POST functionality', function() {
    it('POST /api/hit with invalid body should respond with error 400', function(done) {
      request('localhost:3000')
        .post('/api/hit')
        .send({
          name: 'shane',
          location: 'CF401',
          time: 'saturday july 30th'
        })
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });

    it('POST /api/hit with valid body should respond with status code 200', function(done) {
      request('localhost:3000')
        .post('/api/hit')
        .send({
          name: 'shane',
          location: 'CF401',
          time: 'saturday july 30th',
          price: '2 us dollars'
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^shane$/);
          expect(res.body).to.have.property('price').to.be.a('string').and.to.match(/^2 us dollars$/);
          done();
        });
    });
  });

  describe('testing GET functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/hit')
        .send({
          name: 'jeff',
          location: 'CF401',
          time: 'aug 29th',
          price: '3 us dollars'
        })
        .end((err, res) => {
          this._id = res.body._id;
          done();
        });
    });

    after(function(done) {
      request('localhost:3000')
        .delete('./api/hit/' + this._id)
        .end(() => {
          done();
        });
    });

    it('GET /api/hit with invalid ID should respond with status code 404', function(done) {
      request('localhost:3000')
        .get('/api/hit/badID')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('GET /api/hit with valid ID should respond with status code 200', function(done) {
      request('localhost:3000')
        .get('/api/hit/' + this._id)
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').to.be.a('string').and.to.match(/^jeff$/);
          expect(res.body).to.have.property('price').to.be.a('string').and.to.match(/^3 us dollars$/);
          done();
        });
    });

    it('GET /api/hit/all with should respond with status code 200', function(done) {
      request('localhost:3000')
        .get('/api/hit/all')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('testing PUT functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/hit')
        .send({
          name: 'vien',
          location: 'CF401',
          time: 'sept 29th',
          price: '100000 us dollars'
        })
        .end((err, res) => {
          this._id = res.body._id;
          done();
        });
    });

    after(function(done) {
      request('localhost:3000')
        .delete('./api/hit/' + this._id)
        .end(() => {
          done();
        });
    });

    it('PUT /api/hit with invalid ID should respond with status code 404', function(done) {
      request('localhost:3000')
        .put('/api/hit/badID')
        .send({
          name: 'new vien'
        })
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('PUT /api/hit with valid ID and invalid body should respond with status code 400', function(done) {
      request('localhost:3000')
        .put('/api/hit/badID')
        .send({
          notAProperty: 'new vien'
        })
        .end(function(err, res) {
          expect(res).to.have.status(400);
          expect(res.text).to.have.string('bad request');
          done();
        });
    });

    it('PUT /api/hit with valid ID and body should respond with status code 200', function(done) {
      request('localhost:3000')
        .put('/api/hit/' + this._id)
        .send({
          name: 'new vien'
        })
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.text).to.have.string('successfully updated');
          done();
        });
    });
  });

  describe('testing DELETE functionality', function() {
    before(function(done) {
      request('localhost:3000')
        .post('/api/hit')
        .send({
          name: 'to be deleted',
          location: 'CF401',
          time: 'sept 29th',
          price: '100000 us dollars'
        })
        .end((err, res) => {
          this._id = res.body._id;
          done();
        });
    });

    it('DELETE /api/hit with invalid ID should respond with status code 404', function(done) {
      request('localhost:3000')
        .delete('/api/hit/badID')
        .end(function(err, res) {
          expect(res).to.have.status(404);
          expect(res.text).to.have.string('not found');
          done();
        });
    });

    it('DELETE /api/hit with valid ID should respond with status code 204', function(done) {
      request('localhost:3000')
        .delete('/api/hit/' + this._id)
        .end(function(err, res) {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
