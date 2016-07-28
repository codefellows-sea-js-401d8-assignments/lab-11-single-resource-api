'use strict';

const pokemonMongo = require('../model/pokemonMongo');
const express = require('express');
const router = express.Router();

let pokemonCollection = {}; 

router.post('/pokemon/', (req, res, next) => {
  let newPokemon = new pokemonMongo(req.body);
  newPokemon.save((err, pokemon) => {
    if (err) return next(err);
    res.json(pokemon);
  });
});

router.delete('/pokemon/:pokeId', (req, res) => {
  for(let key in pokemonCollection){
    if(key === req.params.pokeId) {
      console.log('Deleting: ' + pokemonCollection[key].pokeName);
      delete pokemonCollection[key];
      res.json({message: 'Succesfull delete'});
    }
  }
  res.end();
});

router.get('/pokemon/:pokeId', (req, res, next) => {
  for(let key in pokemonCollection){
    if(key === req.params.pokeId) {
      console.log('Found matching Pokemon!');
      res.json('Here is the pokemon you requested: ' + pokemonCollection[key].pokeName +
      ', type: ' + pokemonCollection[key].pokeType);
      res.end();
    }
  }
  let handledError = new Error();
  handledError.status = 404;
  next(handledError);
});

router.get('/', (req, res) => {
  res.json({message: 'You have reached the API\'s home directory...'});
});

module.exports = router;
