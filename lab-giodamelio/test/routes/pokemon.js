const supertest = require('supertest-as-promised');
const expect = require('chai').expect;
const shortid = require('shortid');

const server = require('../../lib/server');

describe('Route - Pokemon', () => {
  describe('POST', () => {
    it('Create new pokemon', () => (
      supertest(server)
        .post('/api/pokemon')
        .send({
          name: 'Bulbasaur',
          number: 1,
          height: 7,
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          expect(shortid.isValid(res.body.id)).to.be.true;
          expect(res.body.name).to.equal('Bulbasaur');
          expect(res.body.number).to.equal(1);
          expect(res.body.height).to.equal(7);
        })
    ));
  });
});
