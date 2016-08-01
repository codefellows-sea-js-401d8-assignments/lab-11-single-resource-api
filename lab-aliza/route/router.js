'use strict';

const Router = require('express').Router;
const debug = require('debug');
const serverlog = debug('serverlog');
const AppError = require('../lib/apperror');
const User = require('../model/userschema');
let router = Router();
var bodyParser = require('body-parser');
let jsonParser = bodyParser.json();
let urlParser = bodyParser.urlencoded({
  extended: true
});
router.use(jsonParser);
router.use(urlParser);
const errResponse = require('../lib/errorresponse');

router.get('/', (req, res) => {
  res.send('User DB');
});

router.get('/all', (req, res) => {
  User.find({})
  .exec((err, users) => {
    if (err) return errResponse(AppError.error404('404').respond(res));
    res.status(200).json(users);
    serverlog('users: ', users);
  });
});

router.get('/user/:id', (req, res) => {
  console.log('getting user ' + req.params.id);
  User.findOne({
    _id: req.params.id
  })
  .exec((err, users) => {
    if (err) return errResponse(AppError.error404('404').respond(res));
    serverlog('users: ', users);
    res.status(200).json(users);
  });
});

router.post('/users', (req, res) => {
  let newUser = new User();
  req.body = newUser;
  newUser.save((err, user) => {
    if (err) return errResponse(AppError.error404('404').respond(res));
    res.status(200).send(user);
    serverlog('user: ', user);
  });
});

router.put('/user/:id', (req, res) => {
  User.findOneAndUpdate({
    '_id': req.params.id
  })
  .exec((err, users) => {
    if (err) return errResponse(AppError.error404('404').respond(res));
    serverlog('users: ', users);
    res.status(200).json(users);
  });
});

router.delete('/user/:id', (req, res) => {
  let _id = req.params.id;
  serverlog('id: ', req.params.id);
  User.findOneAndRemove({_id}, (err)=>{
    if (err) return errResponse(AppError.error404('404 not found').respond(res));
    res.status(200).json(res);
  });
});

module.exports = router;
