const Router = require('express').Router;
const debug = require('debug')('lab:router:pokemon');

const Pokemon = require('../models/pokemon');

const router = new Router();

const POKEMON = {};

router.get('/', (req, res) => {
  res.send('Hello Pokemon');
});

router.post('/', (req, res) => {
  const pokemon = new Pokemon(req.body.name, req.body.number, req.body.height);
  POKEMON[pokemon.id] = pokemon;
  res.send(pokemon);
  debug(`Created new pokemon ${pokemon.name}(${pokemon.id})`);
});

module.exports = router;
