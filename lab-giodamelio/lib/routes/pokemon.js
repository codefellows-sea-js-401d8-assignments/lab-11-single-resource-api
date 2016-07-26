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
    AppError.notFound(res, `Pokemon with id '${req.params.id}' does not exist`);
  }
});

router.get('/', (req, res) => {
  AppError.badRequest(res, 'No pokemon id sent');
});

router.put('/:id', (req, res) => {
  let pokemon = POKEMON[req.params.id];
  pokemon = Object.assign(pokemon, req.body);
  res.json(pokemon);
  debug(`Updated pokemon ${pokemon.name}(${pokemon.id})`);
});

router.post('/', (req, res) => {
  const pokemon = new Pokemon(req.body.name, req.body.number, req.body.height);
  POKEMON[pokemon.id] = pokemon;
  res.json(pokemon);
  debug(`Created new pokemon ${pokemon.name}(${pokemon.id})`);
});

router.delete('/:id', (req, res) => {
  const pokemon = POKEMON[req.params.id];
  res.json(pokemon);
  delete POKEMON[req.params.id];
  debug(`Deleted new pokemon ${pokemon.name}(${pokemon.id})`);
});

module.exports = router;
