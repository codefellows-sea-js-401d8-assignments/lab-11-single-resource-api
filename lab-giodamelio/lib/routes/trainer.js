'use strict';
const Router = require('express').Router;
const debug = require('debug')('lab:router:trainer');

const Trainer = require('../models/trainer');
const AppError = require('../appError');

const router = new Router();

router.get('/all', (req, res) => {
  Trainer.find()
    .then((trainer) => {
      res.json(trainer);
      debug('Listed app trainer');
    });
});

router.get('/:id', (req, res) => {
  Trainer.findOne({ _id: req.params.id })
    .then((trainer) => {
      res.json(trainer);
      debug(`Read trainer ${trainer.name}(${trainer.id})`);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Trainer with id '${req.params.id}' does not exist`));
    });
});

router.get('/', (req, res) => {
  res.sendError(new AppError(400, 'No trainer id sent'));
});

router.put('/:id', (req, res) => {
  Trainer.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((trainer) => {
      res.json(trainer);
      debug(`Updated trainer ${trainer.name}(${trainer.id})`);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Trainer with id=${req.params.id} does not exist`));
    });
});

router.put('/', (req, res) => {
  res.sendError(new AppError(400, 'No trainer id sent'));
});

router.post('/', (req, res, next) => {
  if (req.body.name) {
    const trainer = new Trainer(req.body);
    trainer.save()
      .then((savedTrainer) => {
        res.json(savedTrainer);
        debug(`Created new trainer ${savedTrainer.name}(${savedTrainer.id})`);
      })
      .catch(next);
  } else {
    res.sendError(new AppError(400, 'Insufficent data to create new trainer'));
  }
});

router.delete('/:id', (req, res) => {
  Trainer.findOneAndRemove({ _id: req.params.id })
    .then((trainer) => {
      res.json(trainer);
      debug(`Deleted new trainer ${trainer.name}(${trainer.id})`);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Trainer with id=${req.params.id} does not exist`));
    });
});

router.delete('/', (req, res) => {
  res.sendError(new AppError(400, 'No trainer id sent'));
});

router.use('/:trainerId/pokemon', require('./trainer_pokemon'));

module.exports = router;
