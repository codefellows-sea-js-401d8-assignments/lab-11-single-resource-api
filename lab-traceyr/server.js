'use strict';
const express = require('express');
const mongoose = require('mongoose');
let app = express();
let router = require('./route/router');

app.use('/api', router);

module.exports = exports = app.listen(3003, function(){
  console.log('Server is On');
});
