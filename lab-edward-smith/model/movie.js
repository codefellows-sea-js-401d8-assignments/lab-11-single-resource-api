'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  title: String,
  director: String,
  year_released: Date
});

module.exports = mongoose.model('Movie', MovieSchema);
