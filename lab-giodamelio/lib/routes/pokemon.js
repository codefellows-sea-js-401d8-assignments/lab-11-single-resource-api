'use strict';
const Router = require('express').Router;
const debug = require('debug')('lab:router:pokemon');

const Pokemon = require('../models/pokemon');
const AppError = require('../appError');

const router = new Router();

router.get('/all', (req, res) => {
  Pokemon.find()
    .then((pokemon) => {
      res.json(pokemon);
      debug('Listed app pokemon');
    });
});

router.get('/:id', (req, res) => {
  Pokemon.findOne({ _id: req.params.id })
    .then((pokemon) => {
      res.json(pokemon);
      debug(`Read pokemon ${pokemon.name}(${pokemon.id})`);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Pokemon with id '${req.params.id}' does not exist`));
    });
});

router.get('/', (req, res) => {
  res.sendError(new AppError(400, 'No pokemon id sent'));
});

router.put('/:id', (req, res) => {
  Pokemon.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((pokemon) => {
      res.json(pokemon);
      debug(`Updated pokemon ${pokemon.name}(${pokemon.id})`);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Pokemon with id=${req.params.id} does not exist`));
    });
});

router.put('/', (req, res) => {
  res.sendError(new AppError(400, 'No pokemon id sent'));
});

router.post('/', (req, res, next) => {
  if (req.body.name && req.body.number && req.body.height) {
    const pokemon = new Pokemon(req.body);
    pokemon.save()
      .then((savedPokemon) => {
        res.json(savedPokemon);
        debug(`Created new pokemon ${savedPokemon.name}(${savedPokemon.id})`);
      })
      .catch(next);
  } else {
    res.sendError(new AppError(400, 'Insufficent data to create new pokemon'));
  }
});

router.delete('/:id', (req, res) => {
  Pokemon.findOneAndRemove({ _id: req.params.id })
    .then((pokemon) => {
      res.json(pokemon);
      debug(`Deleted new pokemon ${pokemon.name}(${pokemon.id})`);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Pokemon with id=${req.params.id} does not exist`));
    });
});

router.delete('/', (req, res) => {
  res.sendError(new AppError(400, 'No pokemon id sent'));
});

module.exports = router;
