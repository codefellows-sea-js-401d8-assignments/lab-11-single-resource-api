'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const Coffee = require('../model/coffee_drinks');
chai.use(chaiHTTP);
let app = require('../server');
let server;
let testCoffee;

const expect = chai.expect;
const request = chai.request;
const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('testing routes for COFFEE', () =>{
  before((done) =>{
    server = app.listen(3002, () =>{
      console.log('Server On 3002');
      // done();
    });

    testCoffee = Coffee({
      name: 'Latte',
      rating: 3,
      usualOrder: false
    }).
    testCoffee.save((err, coffee) =>{
      testCoffee = coffee;
      done();
    });
  });

  after((done) =>{
    mongoose.connection.db.dropDatabase(() =>{
      server.close();
      done();
    });
  });

  it('should POST 400 error', function(done){
    request('localhost:3002')
      .post('/api/coffee')
      .send({
        something: 'isnothing'
      })
      .end(function(err, res){
        expect(res).to.have.status(400);
        expect(res.text).to.have.string('bad request');
        done();
      });
  });

  it('should POST 200', function(done){
    request('localhost:3002')
      .post('/api/coffee')
      .send({
        name: 'americano',
        rating: 4,
        usualOrder: true
      })
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.text).to.have.string('americano');
        done();
      });
  });

  it('should GET 404 error', function(done){
    request('localhost:3002')
      .get('/api/coffee/1111')
      .end(function(err, res){
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should GET 200', function(done){
    request('localhost:3002')
      .get('/api/coffee/' + testCoffee._id)
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body.usualOrder).to.eql('false');
        done();
      });
  });
});
