'use strict';

'use strict';

const express = require('express');
const AppErr = require('../model/app_err_handle');
const bodyParser = require('body-parser').json();
const Coffee = require('../model/coffee_drinks');

const router = module.exports = exports = express.Router();

//do I need next in the post function call?
router.post('/coffee', bodyParser, (req, res)=>{
  if(!req.body.name || !req.body.rating || !req.body.usualOrder) return res.sendError(AppErr.error400('bad request, no body'));
  Coffee(req.body).save((err, coffee, next) => {
    if(err) return next(err);
    res.status(200).json(coffee);
  });

});
//
// router.get();
//
// router.put();
//
// router.delete();

module.exports = exports = router;
