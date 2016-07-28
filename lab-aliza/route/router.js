'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const User = require('../model/userschema');
const debug = require('debug');
const serverlog = debug('serverlog');
const appError = require('../lib/apperror');
const router = module.exports = exports = express.Router();
router.use(bodyParser.json());

router.get('/user/:id', (err, req, res, next) => {
  let _id = req.params.id;
  serverlog('id: ', req.params.id);
  User.findOne({
    _id
  }, (err, users) => {
    if (err) return next(appError.error404('404').respond(res));
    serverlog('users: ', users);
    res.json(users);
  });
});

router.get('/all', (err, req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(appError.error404('404').respond(res));
    res.json(users);
    serverlog('users: ', req.params.id);
  });
});

router.post('/user', jsonParser, (err, req, res, next) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return next(appError.error404('404').respond(res));
    res.json(user);
    serverlog('user: ', user);
  });
});

router.put('/user/:id', (err, req, res, next) => {
  User.findOneAndUpdate({
    '_id': req.params.id
  }, req.body, (err) => {
    if (err) return next(appError.error404('404 not found').respond(res));
    res.json({
      message: 'success'
    });
    serverlog('req body: ', req.body);
  });
});

router.delete('/user/:id', (err, req, res, next) => {
  let _id = req.params.id;
  serverlog('id: ', req.params.id);
  User.findOneAndRemove({_id}, (err)=>{
    if (err) return next(appError.error404('404 not found').respond(res));
    res.json({
      message: 'success'
    });
  });
});

module.exports = router;
