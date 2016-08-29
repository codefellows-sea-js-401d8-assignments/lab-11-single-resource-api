'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: String,
  countryOfOrigin: String,
  isItGood: {type: Boolean, default: true}
});

let Food = module.exports = exports = mongoose.model('Food', foodSchema);
