const expect = require('chai').expect;
const shortid = require('shortid');

const Pokemon = require('../../lib/models/pokemon');

describe('Model - Pokemon', () => {
  it('Create new pokemon', () => {
    const pokemon = new Pokemon('Bulbasaur', 1, 7);
    expect(pokemon).to.be.an.instanceof(Pokemon);
    expect(shortid.isValid(pokemon.id)).to.be.true;
    expect(pokemon.name).to.equal('Bulbasaur');
    expect(pokemon.number).to.equal(1);
    expect(pokemon.height).to.equal(7);
  });
});
