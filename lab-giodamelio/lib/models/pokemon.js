const mongoose = require('mongoose');

module.exports = mongoose.model('Pokemon', {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
