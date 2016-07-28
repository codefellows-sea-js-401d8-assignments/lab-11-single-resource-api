'use strict';

const Router = require('express').Router;
const api = require('./api_routes');
const bodyParser = require('body-parser').json();
const AppError = require('../lib/app_error');

let router = new Router();

router.get('/', (req, res) => {
  api.homepageGet(req, res);
});

router.get('/api/projects/all', (req, res) => {
  api.projectsGetAll(req, res);
});

router.get('/api/projects', (req, res) => {
  let error = AppError.new400('Connection at /api/projects without any id');
  res.sendError(error);
});

router.get('/api/projects/:id', (req, res) => {
  api.projectsGetById(req, res);
});

router.post('/api/projects', bodyParser, (req, res) => {
  api.projectsPost(req, res);
});

router.delete('/api/projects/:id', (req, res) => {
  api.projectsDelete(req, res);
});

router.put('/api/projects/:id', (req, res) => {
  api.projectsPut(req, res);
});

router.get('*', (req, res) => {
  let responseJson = {};
  responseJson.status = 404;
  responseJson.msg = '404 Not Found';
  res.status(responseJson.status).json(responseJson);
});

module.exports = router;
