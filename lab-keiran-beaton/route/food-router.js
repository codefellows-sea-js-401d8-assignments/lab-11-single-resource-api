'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Food = require('../model/food');
const ErrorHandler = require('../lib/errorHandler');

const foodRouter = module.exports = exports = express.Router();

foodRouter.post('/', jsonParser, (req, res, next) => {
  let badId = ErrorHandler(400, next);
  (Food(req.body)).save().then(res.json.bind(res), badId);
});

foodRouter.get('/', (req, res, next) => {
  Food.find({}, (err, food) => {
    if (err) {
      ErrorHandler(500, next, 'Internal Server Error');
    }
    res.json(food);
  });
});

foodRouter.get('/:id', (req, res, next) => {
  Food.findOne({'_id':req.params.id}, (err, food) => {
    if (err) {
      ErrorHandler(400, next, 'Bad Request');
    }
    res.json(food);
  });
  ErrorHandler(404, next, 'Not Found');
});

foodRouter.put('/:id', jsonParser, (req, res, next) => {
  Food.findOneAndUpdate({'_id':req.params.id}, req.body, (err) => {
    if (err) {
      ErrorHandler(400, next, 'Bad Request');
    }
    let message = 'success';
    res.json(message);
  });
  ErrorHandler(404, next, 'Not Found');
});

foodRouter.delete('/:id', (req, res, next) => {
  Food.findOneAndRemove({'_id':req.params.id}, (err) => {
    if (err) {
      ErrorHandler(400, next, 'Bad Request');
    }
    let message = 'success';
    res.json(message);
  });
  ErrorHandler(404, next, 'Not Found');
});
