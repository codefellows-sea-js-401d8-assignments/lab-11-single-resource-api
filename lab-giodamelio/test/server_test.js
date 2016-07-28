const supertest = require('supertest-as-promised');

process.env.DEBUG = ''; // Hide debug messages during the tests
process.env.NODE_ENV = 'testing'; // Hide morgan routes

const server = require('../lib/server');

describe('Server', () => {
  it('Make the server crash', () => (
    supertest(server)
      .get('/500')
      .expect(500)
      .expect('Content-Type', /json/)
      .expect({
        error: 'Internal server error',
      })
  ));
});

