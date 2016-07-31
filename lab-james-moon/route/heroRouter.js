'use strict';
const express = require('express');
const heroRouter = express.Router();
const jsonParser = require('body-parser').json();
const AppError = require('../lib/app-error');
const Hero = require('../model/hero');

heroRouter.get('/hero', (req, res) => {
  Hero.find({}, (err, hero) => {
    if (err) throw err;
    res.json(hero);
  });
});

heroRouter.get('/hero/:id', jsonParser, (req, res) => {
  if (!req.params.id) res.sendError(AppError.status404('not found'));
  Hero.findById({'_id': req.params.id}, (err, hero) => {
    if (err) {
      if (!hero) {
        return res.sendError(AppError.status404('not found'));
      }
    }
    res.json(hero);
  });
});

heroRouter.post('/hero', jsonParser, (req, res) => {
  let newHero = Hero(req.body);
  newHero.save((err, hero) => {
    if (err) throw err;
    console.log('created new hero under id: ' + newHero.id);
    res.json(hero);
  });
});

heroRouter.put('/hero/:id', jsonParser, (req, res) => {
  if (!req.body.name && !req.body.race && !req.body.faction) {
    return res.sendError(AppError.status400('bad request'));
  }
  Hero.findOneAndUpdate({'_id': req.params.id}, req.body, (err, hero) => {
    if (err) {
      if (!req.params.id) {
        return res.sendError(AppError.status404('not found'));
      }
      if (!hero) {
        return res.sendError(AppError.status404('not found'));
      }
    }
    res.json(hero);
  });
});

heroRouter.delete('/hero/:id', jsonParser, (req, res) => {
  Hero.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.sendError(AppError.status404('not found'));
    console.log('deleted ' + req.params.id);
    res.status(204).send({});
  });
});

module.exports = heroRouter;
