'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
const mongoose = require('mongoose');
const Coffee = require('../model/coffee_drinks');
chai.use(chaiHTTP);
let app = require('../server');
let server, testNewCoffee;

const expect = chai.expect;
const request = chai.request;
const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('testing routes for COFFEE', () =>{
  before((done) =>{
    server = app.listen(3002, () =>{
      console.log('Server On 3002');
    });

    testNewCoffee = Coffee({
      name: 'Latte',
      rating: 3,
      usualOrder: false
    });
    testNewCoffee.save((err, coffee) =>{
      testNewCoffee = coffee;
      done();
    });
  });

  after((done) =>{
    mongoose.connection.db.dropDatabase(() =>{
      mongoose.disconnect();
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
      .get('/api/coffee/' + testNewCoffee._id)
      .end(function(err, res){
        expect(res).to.have.status(200);
        expect(res.body.usualOrder).to.eql(false);
        done();
      });
  });

  // it('should PUT 200', function(done){
  //   request('localhost:3002')
  //     .put('/api/coffee/' + testNewCoffee._id)
  //     .send({
  //       name: 'mocha',
  //       rating: 1,
  //       usualOrder: false
  //     })
  //     .end(function(err, res){
  //       expect(res).to.have.status(200);
  //       expect(res.body.name).to.eql('mocha');
  //       done();
  //     });
  // });

  it('should PUT 400', function(done){
    request('localhost:3002')
      .put('/api/coffee/' + testNewCoffee._id)
      .end(function(err){
        expect(err).to.have.status(400);
        done();
      });
  });

  // it('should PUT 404', function(done){
  //   request('localhost:3000')
  //     .put('/api/coffee/1234')
  //     .send({
  //       name: 'americano',
  //       rating: 4,
  //       usualOrder: true
  //     })
  //     .end(function(err){
  //       expect(err).to.have.status(404);
  //       done();
  //     });
  // });

  //
  // it('should DELETE 404', function(done){
  //   request('localhost:3000')
  //     .delete('/api/coffee/1234')
  //     .end(function(err, res){
  //       expect(res).to.have.status(404);
  //       done();
  //     });
  // });

  // it('should DELETE 204', function(done){
  //   request('localhost:3000')
  //     .delete('/api/coffee/' + testNewCoffee._id)
  //     .end(function(err, res){
  //       expect(res).to.have.status(204);
  //       done();
  //     });
  // });
});
