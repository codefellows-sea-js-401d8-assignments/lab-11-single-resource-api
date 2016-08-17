'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Food = require('../model/food');

const foodRouter = module.exports = exports = express.Router();

foodRouter.post('/', jsonParser, (req, res, next) => {
  let newFood = new Food(req.body);
  newFood.save((err, food) => {
    if (err) return next(err);
    res.json(food);
  });
});

foodRouter.get('/', (req, res, next) => {
  Food.find({}, (err, foods) => {
    if (err) return next(err);
    res.json(foods);
  });
});

foodRouter.get('/:id', (req, res, next) => {
  Food.findOne({_id: req.params.id}, (err, food) => {
    if (err) return next(err);
    res.json(food);
  });
});

foodRouter.put('/:id', jsonParser, (req, res, next) => {
  Food.findOneAndUpdate({_id: req.params.id}, req.body, (err) => {
    if (err) return next(err);
    res.json({message:'success'});
  });
});

foodRouter.delete('/:id', (req, res, next) => {
  Food.findOneAndRemove({_id: req.params.id}, (err) => {
    if (err) return next(err);
    res.json({message:'success'});
  });
});
