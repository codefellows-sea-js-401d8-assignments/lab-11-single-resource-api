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

module.exports = heroRouter;
