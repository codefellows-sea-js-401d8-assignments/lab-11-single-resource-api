'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Food = require('../model/food');
const AppError = require('../lib/appError');

const foodRouter = module.exports = exports = express.Router();

foodRouter.post('/', jsonParser, (req, res, next) => {
  if(!req.body) return res.sendError(AppError.error400('invalid body'));
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
    if(!food) return res.sendError(AppError.error404('invalid id'));
    if (err) return next(err);
    res.json(food);
  });
});

foodRouter.put('/:id', jsonParser, (req, res, next) => {
  if(!req.params.id) return res.sendError(AppError.error404('no id'));
  if(!req.body) return res.sendError(AppError.error400('invalid body'));
  Food.findOneAndUpdate({_id: req.params.id}, req.body, (err, food) => {
    if(!food) return res.sendError(AppError.error404('invalid id'));
    if (err) return next(err);
    res.json({message:'success'});
  });
});

foodRouter.delete('/:id', (req, res, next) => {
  if(!req.body.id) return res.sendError(AppError.error404('no id'));
  Food.findOneAndRemove({_id: req.params.id}, (err, food) => {
    if(!food) return res.sendError(AppError.error404('invalid id'));
    if (err) return next(err);
    res.json({message:'success'});
  });
});
