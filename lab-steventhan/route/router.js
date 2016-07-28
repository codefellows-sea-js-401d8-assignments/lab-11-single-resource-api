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
  let _id = req.params.id;
  Project.count({_id}, (err, count) => {
    if (err) return next(err);
    if (count > 0) {
      Project.find({_id}, (err, project) => {
        if (err) return next(err);
        return res.json(project);
      });
    } else {
      next(AppError.new404('Id not found'));
    }
  });
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
  } else {
    next(AppError.new400('Invalid Json'));
  }
});

projectRouter.delete('/:id', (req, res, next) => {
  let _id = req.params.id;
  Project.findOneAndRemove({_id}, (err) => {
    if (err) return next(err);
    return res.json({
      status: 204,
      msg: 'Success'
    });
  });
  // next();
});

projectRouter.put('/:id', bodyParser, (req, res, next) => {
  let _id = req.params.id;
  let parsedJson = req.body;
  Project.count({_id}, (err, count) => {
    if (err) return next(err);
    if (count > 0) {
      if (parsedJson.projectName !== undefined &&
          parsedJson.technology !== undefined &&
          parsedJson.github !== undefined) {
        Project.findOneAndUpdate({_id}, parsedJson, (err) => {
          if (err) return next(err);
          return res.json({
            status: 200,
            msg: 'Success'
          });
        });
      } else {
        next(AppError.new400('Invalid Json'));
      }
    } else {
      next(AppError.new404('Id not found'));
    }
  });
});


module.exports = projectRouter;
