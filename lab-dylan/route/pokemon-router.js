'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const Pokemon = require('../model/pokemon');
const debug = require('debug');
const serverLog = debug('server:log');
const pokemonRouter = module.exports = exports = express.Router();

pokemonRouter.get('/:id', (req, res, next) => {
  let _id = req.params.id;
  serverLog('Type: GET, pokemon with id ' + _id);
  Pokemon.findOne({
    _id
  }, (err, pokemon) => {
    if (err) return next(err);
    res.json(pokemon);
  });
});

pokemonRouter.get('/', (req, res, next) => {
  serverLog('Type: GET, all pokemon');
  Pokemon.find({}, (err, pokemons) => {
    if (err) return next(err);
    res.json(pokemons);
  });
});

pokemonRouter.post('/', jsonParser, (req, res, next) => {
  serverLog('Type: POST, post pokemon');
  if(req.body.name && req.body.type && req.body.number) {
    let newPokemon = new Pokemon(req.body);
    newPokemon.save((err, pokemon) => {
      if (err) return next(err);
      res.json(pokemon);
    });
  } else {
    let AppError;
    next(AppError);
  }
});

pokemonRouter.put('/id', jsonParser, (req, res, next) => {
  serverLog('Type: PUT, pokemon');
  Pokemon.findOneAndUpdate({
    '_id': req.params.id
  }, req.body, (err) => {
    if (err) return next(err);
    res.json({
      message: 'success'
    });
  });
});

pokemonRouter.delete('/:id', (req, res, next) => {
  serverLog('Type: DELETE, pokemon');
  let _id = req.params.id;
  Pokemon.findOneAndRemove({_id}, (err) => {
    if (err) return next(err);
    res.json({
      message: 'successfully deleted'
    });
  });
});
