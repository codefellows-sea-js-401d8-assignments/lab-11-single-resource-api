'use strict';
const express = require('express');
const mongoose = require('mongoose');
let app = express();
let router = require('./route/router');
let sendError = require('./lib/sendError');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);


app.use(sendError);
app.use('/api', router);

module.exports = app;
