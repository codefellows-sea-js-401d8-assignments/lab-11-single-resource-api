'use strict';
const Router = require('express').Router;
const debug = require('debug')('lab:router:pokemon');
const _ = require('lodash');

const Pokemon = require('../models/pokemon');
const AppError = require('../appError');

const router = new Router();

const POKEMON = {};

router.get('/all', (req, res) => {
  res.json(_.values(POKEMON));
  debug('Listing app pokemon');
});

router.get('/:id', (req, res) => {
  const pokemon = POKEMON[req.params.id];
  if (pokemon) {
    res.json(pokemon);
    debug(`Read pokemon ${pokemon.name}(${pokemon.id})`);
  } else {
    res.sendError(new AppError(404, `Pokemon with id '${req.params.id}' does not exist`));
  }
});

router.get('/', (req, res) => {
  res.sendError(new AppError(400, 'No pokemon id sent'));
});

router.put('/:id', (req, res) => {
  let pokemon = POKEMON[req.params.id];
  if (pokemon) {
    pokemon = Object.assign(pokemon, req.body);
    res.json(pokemon);
    debug(`Updated pokemon ${pokemon.name}(${pokemon.id})`);
  } else {
    res.sendError(new AppError(404, `Pokemon with id=${req.params.id} does not exist`));
  }
});

router.put('/', (req, res) => {
  res.sendError(new AppError(400, 'No pokemon id sent'));
});

router.post('/', (req, res) => {
  if (req.body.name && req.body.number && req.body.height) {
    const pokemon = new Pokemon(req.body.name, req.body.number, req.body.height);
    POKEMON[pokemon.id] = pokemon;
    res.json(pokemon);
    debug(`Created new pokemon ${pokemon.name}(${pokemon.id})`);
  } else {
    res.sendError(new AppError(400, 'Insufficent data to create new pokemon'));
  }
});

router.delete('/:id', (req, res) => {
  const pokemon = POKEMON[req.params.id];
  if (pokemon) {
    res.json(pokemon);
    delete POKEMON[req.params.id];
    debug(`Deleted new pokemon ${pokemon.name}(${pokemon.id})`);
  } else {
    res.sendError(new AppError(404, `Pokemon with id=${req.params.id} does not exist`));
  }
});

router.delete('/', (req, res) => {
  res.sendError(new AppError(400, 'No pokemon id sent'));
});

module.exports = router;
