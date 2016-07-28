'use strict';

const Pokemon = require('../model/pokemon');
const express = require('express');
const router = express.Router();

router.post('/pokemon/', (req, res, next) => {
  let newPokemon = new Pokemon(req.body);
  newPokemon.save((err, pokemon) => {
    if (err) return next(err);
    res.json(pokemon);
  });
});

router.delete('/pokemon/:_id', (req, res, next) => {
  let _id = req.params._id;
  Pokemon.findOneAndRemove({_id}, (err, pokemon) => {
    if (pokemon === undefined) {
      let err = new Error();
      err.status = 404;
      return next(err);
    }
    res.json('Succesfull delete...');
  });
});

router.get('/pokemon/:_id', (req, res, next) => {
  let _id = req.params._id;
  Pokemon.findOne({_id}, (err, pokemon) => {
    console.log(pokemon);
    if (pokemon === undefined) {
      let err = new Error();
      err.status = 404;
      return next(err);
    }
    if (err) return next(err);
    res.json(pokemon);
  });
});

router.get('/pokemon/', (req, res, next) => {
  Pokemon.find({}, (err, pokemons) => {
    if (err) return next(err);
    res.json(pokemons);
  });
});

router.get('/', (req, res) => {
  res.json({message: 'You have reached the API\'s home directory...'});
});

module.exports = router;
