'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  active: Boolean,
  date: Number
});

module.exports = exports = mongoose.model('User', UserSchema);
