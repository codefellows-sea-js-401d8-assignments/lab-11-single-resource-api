'use strict';

const Trainer = require('../model/trainer');
const express = require('express');

let trainerPokemonRouter = require('./trainerPokemonRouter');
let trainerRouter = module.exports = exports = express.Router();

trainerRouter.post('/', (req, res, next) => {
  let newTrainer = new Trainer(req.body);
  newTrainer.save((err, trainer) => {
    if (err) return next(err);
    res.json(trainer);
  });
});

trainerRouter.delete('/:_id', (req, res, next) => {
  let _id = req.params._id;
  Trainer.findOneAndRemove({_id}, (err, trainer) => {
    if (trainer === undefined) {
      let err = new Error();
      err.status = 400;
      return next(err);
    }
    res.json('Succesfull delete...');
  });
});

trainerRouter.get('/:_id', (req, res, next) => {
  let _id = req.params._id;
  Trainer.findOne({_id}, (err, trainer) => {
    if (trainer === undefined) {
      let err = new Error();
      err.status = 400;
      return next(err);
    }
    if (err) return next(err);
    res.json(trainer);
  });
});

trainerRouter.get('/', (req, res, next) => {
  Trainer.find({}, (err, trainers) => {
    if (err) return next(err);
    res.json(trainers);
  });
});


trainerRouter.use('/:trainerName/pokemon', trainerPokemonRouter);
