'use strict';

const Router = require('express').Router;
const debug = require('debug');
const serverlog = debug('serverlog');
const appError = require('../lib/apperror');
const User = require('../model/userconstructor');
let router = Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
let jsonParser = bodyParser.json();
const errResponse = require('../lib/errorresponse');

router.get('/user/:id', (req, res) => {
  let _id = req.params.id;
  User.findOne({_id}, (err, users) => {
    if (err) return errResponse(appError.error404('404').respond(res));
    serverlog('users: ', users);
    res.status(200).json(users);
  });
});

router.get('/all', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return errResponse(appError.error404('404').respond(res));
    res.status(200).json(users);
    serverlog('users: ', users);
  });
});

router.post('/user', jsonParser, (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return errResponse(appError.error404('404').respond(res));
    res.status(200).json(user);
    serverlog('user: ', user);
  });
});

router.put('/user/:id', (req, res) => {
  User.findOneAndUpdate({
    '_id': req.params.id
  }, req.body, (err) => {
    if (err) return errResponse(appError.error404('404 not found').respond(res));
    res.status(200).json(res);
    serverlog('updated user: ', req.body);
  });
});

router.delete('/user/:id', (req, res) => {
  let _id = req.params.id;
  serverlog('id: ', req.params.id);
  User.findOneAndRemove({_id}, (err)=>{
    if (err) return errResponse(appError.error404('404 not found').respond(res));
    res.status(200).json(res);
  });
});

module.exports = router;
