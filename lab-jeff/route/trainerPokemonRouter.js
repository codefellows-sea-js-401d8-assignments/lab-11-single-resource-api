'use strict';

const Trainer = require('../model/trainer');
const express = require('express');

let trainerPokemonRouter = module.exports = exports = express.Router({mergeParams: true});

let findTrainer = function(req, res, next) {
  let name = req.params.trainerName;
  Trainer.findOne({trainerName: name})
  .then((trainer) => {
    console.log(trainer);
    if (trainer === undefined) {
      let err = new Error();
      err.status = 400;
      next(err);
    }
    debugger;
    // if (err) return next(err);
    req.trainer = trainer;
    next();
  });
};

trainerPokemonRouter.get('/', findTrainer, (req, res, next) => {
  req.trainer.getAllPokemon().then((err, pokemons) => {
    if (err) return next(err);
    res.json(pokemons);
  });
});

trainerPokemonRouter.post('/', findTrainer, (req, res, next) => {
  console.log('attempting post');
  console.log(req.body);
  req.trainer.addPokemon(req.body).then((err, pokemon) => {
    if (err) return next(err);
    res.status(200).json(pokemon);
  });
});

trainerPokemonRouter.delete('/', findTrainer, (req, res, next) => {
  req.trainer.removePokemon().then((err, pokemon) => {
    if (err) return next(err);
    res.json(pokemon);
  });
});
