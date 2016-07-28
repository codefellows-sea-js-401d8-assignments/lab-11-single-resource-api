'use strict';
const express = require('express');
const heroRouter = express.Router();
const jsonParser = require('body-parser').json();
const Hero = require('../model/hero');

heroRouter.post('/hero', jsonParser, (req, res) => {
  console.log('creating new hero');
  let newHero = Hero(req.body);
  newHero.save((err, hero) => {
    if (err) return err;
    res.json(hero);
  });
});

heroRouter.get('/hero/:id', jsonParser, (req, res) => {
  Hero.findById(req.params.id, (err, hero) => {
    if (err) return err;
    res.json(hero);
  });
});

heroRouter.put('/hero/:id', jsonParser, (req, res) => {
  let reqJson = req.body;
  if (reqJson.name) {
    Hero.findByIdAndUpdate(req.params.id, {name: reqJson.name}, (err, hero) => {
      if (err) throw err;
      console.log('updated name to ' + hero.name);
      res.json(hero);
    });
  }
});

module.exports = heroRouter;
