'use strict';

const uuid = require('node-uuid');

module.exports = exports = function(input){
  this.name = input.name;
  this.type = input.type;
  this['final evolution'] = input['final evolution'];
  this.uuid = uuid.v4();
};
