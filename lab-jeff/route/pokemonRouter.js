'use strict';

const Pokemon = require('../model/pokemon');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
  console.log('Post new pokemon...');
  let newPokemon = new Pokemon(req.body);
  newPokemon.save((err, pokemon) => {
    if (err) return next(err);
    res.json(pokemon);
  });
});

router.delete('/:_id', (req, res, next) => {
  let _id = req.params._id;
  Pokemon.findOneAndRemove({_id}, (err, pokemon) => {
    if (pokemon === undefined) {
      let err = new Error();
      err.status = 400;
      return next(err);
    }
    res.json('Succesfull delete...');
  });
});

router.get('/:_id', (req, res, next) => {
  let _id = req.params._id;
  Pokemon.findOne({_id}, (err, pokemon) => {
    if (pokemon === undefined) {
      let err = new Error();
      err.status = 400;
      return next(err);
    }
    if (err) return next(err);
    res.json(pokemon);
  });
});

router.get('/', (req, res, next) => {
  Pokemon.find({}, (err, pokemons) => {
    if (err) return next(err);
    res.json(pokemons);
  });
});

module.exports = router;
