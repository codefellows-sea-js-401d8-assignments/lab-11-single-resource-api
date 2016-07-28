'use strict';
const express = require('express');
const heroRouter = express.Router();

heroRouter.get('/', (req, res) => {
  console.log('entering the hero router');
});
