'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: String,
  element: String,
  number: Number
});

var Pokemon = mongoose.model('Pokemon', pokemonSchema);
module.exports = Pokemon;
