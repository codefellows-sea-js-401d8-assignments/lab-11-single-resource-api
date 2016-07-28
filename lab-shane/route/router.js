'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Constructor = require('../model/constructor.js');
const AppError = require('../lib/app_error.js');

let pokeRouter = module.exports = exports = new Router();

let all = {
  squirtle: {
    name: 'squirtle',
    type: 'water',
    'final evolution': 'Blastoise'
  }
};

pokeRouter.get('/pokemon/all', (req,res) =>{
  res.status(200).send(JSON.stringify(Object.keys(all)));
});

pokeRouter.get('/', (req, res) => {
  return res.sendError(AppError.error404('Unregistered location, please try /api/pokemon/'));
});

pokeRouter.get('/pokemon/', (req, res) => {
  return res.sendError(AppError.error400('No name inputted.'));
});

pokeRouter.get('/pokemon/:name', (req, res) => {
  if (!all[req.params.name]) {
    return res.sendError(AppError.error404('Pokemon not found!'));
  }
  return res.status(200).send(JSON.stringify(all[req.params.name]));
});

pokeRouter.post('/pokemon/:name', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted for pokemon ' + req.params.name + '.'));
  }
  let poke = new Constructor(req.body);
  all[req.params.name] = poke;
  return res.status(200).send('Pokemon ' + req.params.name + ' added: ' + JSON.stringify(poke));
});

pokeRouter.put('/pokemon/:name', jsonParser, (req, res) => {
  if (!req.body.name) {
    return res.sendError(AppError.error400('No data inputted for pokemon ' + req.params.name + '.'));
  }
  else if (!all[req.params.name]) {
    return res.sendError(AppError.error404('Pokemon does not yet exist on server.'));
  }
  all[req.params.name] = {
    'name': req.body.name,
    'type': req.body.type,
    'final evolution': req.body['final evolution']
  };
  return res.status(200).send('Pokemon ' + req.params.name + ' updated: ' + JSON.stringify(all[req.params.name]));
});

pokeRouter.delete('/pokemon/:name', (req, res) => {
  if(!all[req.params.name]){
    return res.sendError(AppError.error404('Pokemon does not yet exist on server.'));
  }
  delete all[req.params.name];
  return res.sendError(AppError.error400('Pokemon ' + req.params.name + ' was deleted!'));
});
