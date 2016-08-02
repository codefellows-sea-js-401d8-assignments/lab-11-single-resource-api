'use strict';

const Trainer = require('../model/trainer');
const express = require('express');

let trainerPokemonRouter = module.exports = exports = express.Router({mergeParams: true});

let findTrainer = function(req, res, next) {
  Trainer.findOne({'_id': req.params.trainerId})
  .then((trainer) => {
    if (trainer === undefined) {
      let err = new Error();
      err.status = 400;
      next(err);
    }
    req.trainer = trainer;
    next();
  });
};

trainerPokemonRouter.get('/', findTrainer, (req, res, next) => {
  req.trainer.findAllPokemon()
  .then((pokemons) => {
    res.status(200).json(pokemons);
  })
  .catch((err) => {
    return next(err);
  });
});

trainerPokemonRouter.post('/', findTrainer, (req, res, next) => {
  req.trainer.addPokemon(req.body)
  .then((pokemon) => {
    res.status(200).json(pokemon);
  })
  .catch((err) => {
    return next(err);
  });
});
