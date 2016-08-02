'use strict';

'use strict';

const express = require('express');
const AppErr = require('../model/app_err_handle');
const bodyParser = require('body-parser').json();
const Coffee = require('../model/coffee_drinks');

const router = module.exports = exports = express.Router();

router.post('/coffee', bodyParser, (req, res, next)=>{
  if(!req.body.name || !req.body.rating || !req.body.usualOrder) return res.sendError(AppErr.error400('bad request, no body'));
  Coffee(req.body).save((err, coffee) => {
    if(err) return next(err);
    res.status(200).json(coffee);
  });

});

router.get('/coffee/:id', (req, res, next) =>{
  let _id = req.params.id;
  Coffee.findById(_id, (err, coffee) =>{
    if(err) return next(AppErr.error404('id not found'));
    res.status(200).json(coffee);
  });
});

router.put('/coffee/:id', bodyParser, (req, res, next) =>{
  let _id = req.params.id;
  if(!req.body.name || !req.body.rating || !req.body.usualOrder) return res.sendError(AppErr.error400('bad request, no body'));
  Coffee.findOneAndUpdate({_id}, req.body, (err) =>{
    if(err) return next(AppErr.error404('id not found'));
    let message = 'success';
    res.status(200).json({message});
  });
});

router.delete('/coffee/:id', (req, res, next) =>{
  let _id = req.params.id;
  Coffee.findOneAndRemove({_id}, (err) =>{
    if(err) return next(AppErr.error404('id not found'));
    let message = 'success';
    res.status(204).json({message});
  });
});

module.exports = exports = router;
