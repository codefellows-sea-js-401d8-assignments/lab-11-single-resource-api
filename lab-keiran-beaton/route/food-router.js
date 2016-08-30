'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Food = require('../model/food');
const ErrorHandler = require('../lib/errorHandler');

const foodRouter = module.exports = exports = express.Router();

foodRouter.post('/', jsonParser, (req, res, next) => {
  (new Food(req.body)).save().then(res.json.bind(res), ErrorHandler(400, next, 'Bad Request'));
});

foodRouter.get('/', (req, res, next) => {
  Food.find().then(res.json.bind(res), ErrorHandler(500, next, 'Internal Server Error'));
});

foodRouter.get('/:id', (req, res, next) => {
  let dbError = ErrorHandler(400, next, 'Bad Request');
  let notFound = ErrorHandler(404, next, 'Not Found');
  Food.findOne({'_id':req.params.id}).then((food) => {
    if (!food) return notFound;
    res.json(food);
  }, dbError);
});

foodRouter.put('/:id', jsonParser, (req, res, next) => {
  (Food.findOneAndUpdate({'_id': req.params.id}, req.body).then(res.json.bind(res), ErrorHandler(400, next)));
});

foodRouter.delete('/:id', (req, res, next) => {
  Food.findOneAndRemove({'_id':req.params.id}).then((food) => {
    if(!food) return ErrorHandler(404, next, 'Not Found');
    res.status(200).json('Success');
  }, ErrorHandler(404, next, 'Not Found'));
});
