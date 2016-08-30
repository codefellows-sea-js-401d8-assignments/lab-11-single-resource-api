'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Food = require('../model/food');
const Promise = require('../lib/promise');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

mongoose.Promise = Promise;

describe('Testing Crud with initial data', () => {
  var server;
  let testFood;
  before((done) => {
    server = require('../server');

    testFood = Food({
      name: 'testFood1',
      countryOfOrigin: 'America',
      isItGood: true
    });

    testFood.save().then((foodData) => {
      this.testFood = foodData;
      done();
    }, (err) => {
      throw err;
    });
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });

  it('should post a food', (done) => {
    request('localhost:3000/api/food')
    .post('')
    .send({name: 'testFood', countryOfOrigin: 'America', isItGood: true})
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should GET a food', (done) => {
    request('localhost:3000/api/food')
      .get('/' + testFood._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('testFood1');
        done();
      });
  });

  it('should return an error on a bad Get', (done) => {
    request('localhost:3000/api/food')
      .get('/badid')
      .end((err, res) => {
        expect(err).to.have.status(400);
        expect(err.message).to.eql('Bad Request');
        expect(res.status).to.not.eql(200);
        done();
      });
  });

  it('should PUT a food', (done) => {
    request('localhost:3000/api/food')
      .put('/' + testFood._id)
      .send({name:'newTestFood'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });


  it('should respond with bad request', (done) => {
    request('localhost:3000/api/food')
      .put('/badid')
      .send({name: 'namenamename'})
      .end((err, res) => {
        expect(err).to.have.status(400);
        expect(err.message).to.eql('Bad Request');
        expect(res).to.not.have.status(200);
        done();
      });
  });

  it('should DELETE a food', (done) => {
    request('localhost:3000/api/food')
      .delete('/' + testFood._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('delete - not found', (done) => {
    request('localhost:3000/api/food')
      .delete('/badid')
      .end((err, res) => {
        expect(err).to.have.status(404);
        expect(err.message).to.eql('Not Found');
        expect(res).to.not.have.status(200);
        done();
      });
  });
});
