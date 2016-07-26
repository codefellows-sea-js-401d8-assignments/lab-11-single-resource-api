'use strict';
const Router = require('express').Router;
const debug = require('debug')('lab:router:pokemon');

const Pokemon = require('../models/pokemon');

const router = new Router();

const POKEMON = {};

router.get('/:id', (req, res) => {
  const pokemon = POKEMON[req.params.id];
  res.json(pokemon);
  debug(`Read pokemon ${pokemon.name}(${pokemon.id})`);
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

module.exports = router;
