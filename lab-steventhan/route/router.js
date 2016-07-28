'use strict';

const Router = require('express').Router;
const bodyParser = require('body-parser').json();
const AppError = require('../lib/app_error');
const Project = require('../model/project');


let projectRouter = new Router();

projectRouter.get('/', (req, res) => {
  let error = AppError.new400('Connection at /api/projects without any id');
  res.sendError(error);
});

projectRouter.get('/all', (req, res, next) => {
  Project.find({}, (err, projects) => {
    if (err) return next(err);
    return res.json(projects);
  });
});

projectRouter.get('/:id', (req, res, next) => {

});

projectRouter.post('/', bodyParser, (req, res, next) => {
  let parsedJson = req.body;
  if (parsedJson.projectName !== undefined &&
      parsedJson.technology !== undefined &&
      parsedJson.github !== undefined) {
    let project = new Project({
      projectName: parsedJson.projectName,
      technology: parsedJson.technology,
      github: parsedJson.github
    });
    project.save((err, project) => {
      if(err) return next(err);
      return res.json(project);
    });
  }});

projectRouter.delete('/:id', (req, res) => {
  // api.projectsDelete(req, res);
});

projectRouter.put('/:id', (req, res) => {
  // api.projectsPut(req, res);
});


module.exports = projectRouter;
