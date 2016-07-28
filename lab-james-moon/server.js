'use strict';
const app = require('express')();
const debug = require('debug');
const serverErrLog = debug('hero:errors');
const heroRouter = require('./route/heroRouter');

app.use('/api', heroRouter);

app.listen(3000, () => console.log('server is up'));
