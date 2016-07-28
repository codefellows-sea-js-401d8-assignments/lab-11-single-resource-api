'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const heroSchema = new Schema({
  name: String,
  race: String,
  faction: String
});

let Hero = mongoose.model('Hero', heroSchema);
module.exports = Hero;
