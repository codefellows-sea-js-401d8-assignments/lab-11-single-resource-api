'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const expect = chai.expect;

const mongoose = require('mongoose');
const User = require('../model/userschema');
var app = require('../server');
let server;

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('Test CRUD ', () => {
  before((done) => {
    server = app.listen(3000, () => {
      console.log('up on 3000');
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
      .post('/api/user')
      .send({
        name: 'testname',
        active: true,
        date: 2016
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('Testing CRUD', () => {
  let testUser;
  before((done) => {
    server = app.listen(3000, () => {
      console.log('up on 3000');
    });
    testUser = User({
      name: 'aliza',
      active: true,
      date: 2016
    });
    testUser.save((err, user) => {
      testUser = user;
      done();
    });
  });
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      server.close();
      done();
    });
  });
  it('should GET a user', (done) => {
    request('localhost:3000')
      .get('/api/user/' + testUser._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.date).to.eql(2016);
        done();
      });
  });
});
