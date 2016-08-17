'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = ('chai').request;
const expect = ('chai').expect;

const Food = require('../model/food');
var app = require('../server');
let server;

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

describe('Test Crud', () => {
  before((done) => {
    server = app.listen(3000, () => {
      console.log('server up on 3000');
      done();
    });
  });

  after((done) => {
    server.close();
    done();
  });

  it('should post a food', (done) => {
    request('localhost:3000')
      .post('/api/food')
      .send({name: 'testFood', countryOfOrigin: 'America'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with bad request', (done) => {
    request('localhost:3000')
      .post('/api/food')
      .end((err, res) => {
        expect(err).to.have.status(400);
        expect(err.message).to.eql('bad request');
        expect(res.status).to.not.eql(200);
        done();
      });
  });
});

describe('Testing Crud with initial data', () => {
  let testFood;
  before((done) => {
    server = app.listen(3000, () => {
      console.log('server up on 3000');
    });
    testFood = Food({name: 'testFood1', countryOfOrigin:'Italy'});
    testFood.save((err, food) => {
      testFood = food;
      done();
    });
  });
  after((done) => {
    server.close();
    done();
  });

  it('should GET a food', (done) => {
    request('localhost:3000')
      .get('api/food/' + testFood._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.name).to.eql('testFood1');
        done();
      });
  });

  it('should return an error on a bad Get', (done) => {
    request('localhost:3000')
      .get('api/food/badid')
      .end((err, res) => {
        expect(err).to.have.status(404);
        expect(err.message).to.eql('not found');
        expect(res.status).to.not.eql(200);
        done();
      });
  });

  it('should PUT a food', (done) => {
    request('localhost:3000')
      .put('/api/food/' + testFood._id)
      .send({name:'newTestFood'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with bad request', (done) => {
    request('localhost:3000')
      .put('/api/food/' + testFood._id)
      .end((err, res) => {
        expect(err).to.have.status(400);
        expect(err.message).to.eql('bad request');
        expect(res.status).to.not.eql(200);
        done();
      });
  });

  it('should respond with not found', (done) => {
    request('localhost:3000')
      .put('/api/food/badid')
      .send({name: 'namenamename'})
      .end((err, res) => {
        expect(err).to.have.status(404);
        expect(err.message).to.eql('not found');
        expect(res.status).to.not.eql(200);
        done();
      });
  });

  it('should DELETE a food', (done) => {
    request('localhost:3000')
      .delete('/api/food/' + testFood._id)
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should respond with not found', (done) => {
    request('localhost:3000')
      .delete('/api/food/badid')
      .end((err, res) => {
        expect(err).to.have.status(404);
        expect(err.message).to.eql(400);
        expect(res.status).to.not.eql(200);
        done();
      });
  });
});
