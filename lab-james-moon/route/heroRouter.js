'use strict';
const express = require('express');
const heroRouter = express.Router();
const jsonParser = require('body-parser').json();
const Hero = require('../model/hero');

heroRouter.post('/hero', jsonParser, (req, res) => {
  console.log('creating new hero');
  let newHero = Hero(req.body);
  newHero.save((err, hero) => {
    if (err) throw err;
    res.json(hero);
  });
});

heroRouter.get('/hero/:id', jsonParser, (req, res) => {
  Hero.findById(req.params.id, (err, hero) => {
    if (err) throw err;
    res.json(hero);
  });
});

heroRouter.put('/hero/:id', jsonParser, (req, res) => {
  if (req.body.name) {
    Hero.findByIdAndUpdate(req.params.id, {name: req.body.name}, (err, hero) => {
      if (err) throw err;
      console.log('updated name to ' + hero.name);
      res.json(hero);
    });
  }
  if (req.body.race) {
    Hero.findByIdAndUpdate(req.params.id, {race: req.body.race}, (err, hero) => {
      if (err) throw err;
      console.log('updated race to ' + hero.race);
      res.json(hero);
    });
  }
  if (req.body.faction) {
    Hero.findbyIdAndUpdate(req.params.id, {faction: req.body.faction}, (err, hero) => {
      if (err) throw err;
      console.log('updated faction to ' + hero.faction);
      res.json(hero);
    });
  }
});

heroRouter.delete('/hero/:id', jsonParser, (req, res) => {
  Hero.findByIdAndRemove(req.params.id, (err) => {
    if (err) throw err;
    console.log('deleted ' + req.params.id);
  });
  res.send('removed hero');
});

module.exports = heroRouter;
