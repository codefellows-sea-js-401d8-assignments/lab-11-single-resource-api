'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  pokeName: String,
  pokeType: String
});

var pokemonMongo = mongoose.model('pokemonMongo', pokemonSchema);
module.exports = pokemonMongo;
