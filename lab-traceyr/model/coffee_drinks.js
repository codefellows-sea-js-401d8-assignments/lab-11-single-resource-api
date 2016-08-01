'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coffeeSchema = new Schema({
  name: String,
  rating: Number,
  usualOrder: Boolean
});

let Coffee = mongoose.model('Coffee', coffeeSchema);
module.exports = Coffee;
