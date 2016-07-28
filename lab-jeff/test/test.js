'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = require('chai').expect;
const request = require('chai').request;
const serverPort = 9000;

describe('routing', function() {
  require('../_server');

  it('should handle unregistered routes', function(done) {
    request('localhost:' + serverPort)
    .get('/noob')
    .end(function(res){
      expect(res).to.have.status(404);
      done();
    });
  });
});
