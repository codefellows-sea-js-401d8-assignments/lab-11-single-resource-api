'use strict';

const express = require('express');
const jsonParser = require('body-parser').json();
const Food = require('../model/food');
const ErrorHandler = require('../lib/errorHandler');

const foodRouter = module.exports = exports = express.Router();

foodRouter.post('/', jsonParser, (req, res, next) => {
  (Food(req.body)).save().then(res.json.bind(res), ErrorHandler(400, next, 'bad request'));
});

foodRouter.get('/', (req, res, next) => {
  Food.find().then(res.bind.json(res), ErrorHandler(500, next, 'internal server error'));
});

foodRouter.get('/:id', (req, res, next) => {
  let notFound = ErrorHandler(404, next);
  Food.findOne({'_id':req.params.id}).then((data) => {
    if (!data) return next(notFound(new Error('not found')));
    res.json(data);
  }, ErrorHandler(400, next, 'bad request'));
});

foodRouter.put('/:id', jsonParser, (req, res, next) => {
  Food.findOneAndUpdate({'_id':req.params.id}, req.body).then(res.json.bind(res), ErrorHandler(400, next, 'bad request'));
});

foodRouter.delete('/:id', (req, res, next) => {
  (Food.remove({'_id':req.params.id})).then(res.json.bind(res), ErrorHandler(400, next, 'bad request'));
});
