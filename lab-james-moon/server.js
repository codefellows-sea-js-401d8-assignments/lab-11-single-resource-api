'use strict';
const app = require('express')();
const debug = require('debug');
const mongoose = require('mongoose');
const serverErrLog = debug('hero:errors');
const heroRouter = require('./route/heroRouter');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

app.use('/api', heroRouter);

app.listen(3000, () => console.log('server is up'));
