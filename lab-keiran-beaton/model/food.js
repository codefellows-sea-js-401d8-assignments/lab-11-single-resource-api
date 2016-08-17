'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: String,
  countryOfOrigin: String,
  isItGood: {type: Boolean, default: true}
});

let Food = mongoose.model('Food', foodSchema);
module.exports = Food;
