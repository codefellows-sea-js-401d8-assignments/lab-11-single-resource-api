'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  pokeName: String,
  pokeType: String
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;
