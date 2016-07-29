const express = require('express');

const Trainer = require('../models/trainer');
const AppError = require('../appError');

const router = new express.Router({ mergeParams: true });

router.use((req, res, next) => {
  Trainer.findOne({ _id: req.params.trainerId })
    .then((trainer) => {
      if (!trainer) {
        return res.sendError(
          new AppError(404, `Trainer with id '${req.params.trainerId}' does not exist`)
        );
      }
      req.trainer = trainer;
      return next();
    })
    .catch(() => {
      res.sendError(new AppError(404, `Trainer with id '${req.params.trainerId}' does not exist`));
    });
});

router.get('/', (req, res) => {
  req.trainer.findAllPokemon()
    .then((pokemon) => {
      res.json(pokemon);
    })
    .catch(() => {
      res.sendError(new AppError(500, 'Internal server error'));
    });
});

router.put('/:pokemonId', (req, res) => {
  req.trainer.addPokemon(req.params.pokemonId)
    .then((pokemon) => {
      res.json(pokemon);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Pokemon with id '${req.params.pokemonId}' does not exist`));
    });
});

router.post('/', (req, res) => {
  req.trainer.createPokemon(req.body)
    .then((pokemon) => {
      res.json(pokemon);
    })
    .catch(() => {
      res.sendError(new AppError(400, 'Insufficent data to create new pokemon'));
    });
});

router.delete('/:pokemonId', (req, res) => {
  req.trainer.removePokemon(req.params.pokemonId)
    .then((deleted) => {
      res.json(deleted);
    })
    .catch(() => {
      res.sendError(new AppError(404, `Pokemon with id '${req.params.pokemonId}' does not exist`));
    });
});

module.exports = router;
