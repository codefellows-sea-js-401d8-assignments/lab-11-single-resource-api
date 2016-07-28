'use strict';
const express = require('express');
const mongoose = require('mongoose');
const heroRouter = express.Router();
const jsonParser = require('body-parser').json();
const Hero = require('../model/hero');

const LOCAL_DB_SERVER = 'mongodb://localhost/dev_db';
const DB_SERVER = process.env.DB_SERVER || LOCAL_DB_SERVER;

mongoose.connect(DB_SERVER);

heroRouter.post('/hero', jsonParser, (req, res) => {
  console.log('creating new hero');
  let newHero = Hero(req.body);
  newHero.save((err, hero) => {
    if (err) return err;
    res.json(hero);
  });
});

module.exports = heroRouter;
