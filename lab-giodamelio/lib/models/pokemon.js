const shortid = require('shortid');

function Pokemon(name, number, height) {
  this.id = shortid.generate();
  this.name = name;
  this.number = number;
  this.height = height;
}

module.exports = Pokemon;
