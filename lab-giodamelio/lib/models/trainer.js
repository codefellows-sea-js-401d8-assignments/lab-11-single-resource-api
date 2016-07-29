const mongoose = require('mongoose');

const Pokemon = require('./pokemon');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
  },
});

trainerSchema.methods.createPokemon = function(pokemonData) {
  const pokemon = new Pokemon(pokemonData);
  pokemon.trainerId = this._id;
  return pokemon.save();
};

trainerSchema.methods.addPokemon = function(pokemonId) {
  return Pokemon.findOneAndUpdate({
    _id: pokemonId,
  }, {
    trainerId: this._id,
  }, {
    new: true,
  });
};

trainerSchema.methods.removePokemon = function(pokemonId) {
  return Pokemon.findOneAndUpdate({
    _id: pokemonId,
  }, {
    trainerId: null,
  }, {
    new: true,
  });
};

trainerSchema.methods.findAllPokemon = function() {
  return Pokemon.find({
    trainerId: this._id,
  });
};

module.exports = mongoose.model('Trainer', trainerSchema);
