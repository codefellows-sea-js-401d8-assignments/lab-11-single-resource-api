'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Pokemon = require('../model/pokemon');
const appError = require('../lib/AppError');

const debug = require('debug');
const serverLog = debug('server:log');
const pokemonRouter = module.exports = exports = express.Router();

pokemonRouter.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  serverLog('Type: GET, pokemon with id ' + _id);
  Pokemon.findOne({
    _id
  }, (err, pokemon) => {
    if (err) res.sendError(err, req, res, next);
    // appError(404, 'Invalid request for ' + pokemon, next)(err);
    res.json(pokemon);
  });
});

pokemonRouter.get('/', (req, res, next) => {
  serverLog('Type: GET, all pokemon');
  Pokemon.find({}, (err, pokemons) => {
    if (err.error.type === 'AppError') return next(err);
    if(err) appError(500, 'Internal server error', next)(err);
    res.json(pokemons);
  });
});

pokemonRouter.post('/', jsonParser, (req, res, next) => {
  serverLog('Type: POST, post pokemon');
  if(req.body.name && req.body.element && req.body.number) {
    let newPokemon = new Pokemon(req.body);
    newPokemon.save((err, pokemon) => {
      if (err.type === 'AppError') return next(err);
      // if (err) appError(400, 'bad request', next)(err);
      res.json(pokemon);
    });
  }
});

pokemonRouter.put('/:id', jsonParser, (req, res, next) => {
  serverLog('Type: PUT, pokemon');
  Pokemon.findOneAndUpdate({
    '_id': req.params.id
  }, req.body, (err) => {
    if (err.error.type === 'AppError') return next(err);
    // if (err)
    res.json({
      message: 'success'
    });
  });
});

pokemonRouter.delete('/:id', (req, res, next) => {
  serverLog('Type: DELETE, pokemon');
  let _id = req.params.id;
  Pokemon.findOneAndRemove({_id}, (err) => {
    if (err.error.type === 'AppError') return next(err);
    res.json({
      message: 'successfully deleted'
    });
  });
});
