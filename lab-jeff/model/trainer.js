'use strict';

const mongoose = require('mongoose');
const Pokemon = require('./pokemon');
const Schema = mongoose.Schema;

const trainerSchema = new Schema({
  trainerName: {type: String, required: true, unique: true},
  trainerSkill: Number
});

trainerSchema.methods.addPokemon = function(pokeData) {
  let pokemon = new Pokemon(pokeData);
  pokemon.trainerId = this._id;
  return pokemon.save();
};


trainerSchema.methods.removePokemon = function(pokemonId) {
  return Pokemon.findOneAndUpdate({'_id': pokemonId}, {trainerId: null});
};

trainerSchema.methods.findAllPokemon = function() {
  return Pokemon.find({trainerId: this._id});
};

var Trainer = mongoose.model('Trainer', trainerSchema);
module.exports = Trainer;
