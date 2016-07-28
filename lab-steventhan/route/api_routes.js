'use strict';

const jsonParser = require('../lib/json_parser');
const Project = require('../model/project');

let api = {};



api.projectsGetById = (req, res) => {
  let projectId = req.params.id;
  let responseJson = {};
  if (projectId !== undefined) {
    if(api.projectsDatabase[projectId] !== undefined) {
      responseJson.status = 200;
      responseJson.msg = 'Success';
      res.status(responseJson.status).json(api.projectsDatabase[projectId]);
    } else {
      responseJson.status = 404;
      responseJson.msg = 'Project id not found';
      res.status(responseJson.status).json(responseJson);
    }
  } else {
    responseJson.status = 400;
    responseJson.msg = 'Bad request, please specify project id. For e.g \'/api/projects/11111\'';
    res.status(responseJson.status).json(responseJson);
  }
};

api.projectsPost = (req, res, next) => {
  let responseJson = {};
  if (!req.body) {
    responseJson.status = 400;
    responseJson.msg = 'Error, no json found in the post request' ;
    return res.status(responseJson.status).json(responseJson);
  }
  let parsedJson = req.body;
  if (parsedJson.projectName !== undefined &&
      parsedJson.technology !== undefined &&
      parsedJson.github !== undefined) {
    let project = new Project(res.body);
    debugger;
    project.save((err, project) => {
      if(err) return next(err);
      return res.json(project);
    });
  }

  responseJson.status = 400;
  responseJson.msg = 'Bad request, check your json';
  return res.status(responseJson.status).json(responseJson);
};

api.projectsDelete = (req, res) => {
  let projectId = req.params.id;
  let responseJson = {};
  if(api.projectsDatabase[projectId] !== undefined) {
    delete api.projectsDatabase[projectId];
    responseJson.status = 204;
    responseJson.msg = 'Success';
  } else {
    responseJson.status = 404;
    responseJson.msg = 'Project id not found';
  }
  res.status(responseJson.status).json(responseJson);
};

api.projectsPut = (req, res) => {
  let projectId = req.params.id;
  let responseJson = {};
  jsonParser(req)
    .then((parsedJson) => {
      if  (api.projectsDatabase[projectId] !== undefined &&
          parsedJson.projectName !== undefined &&
          parsedJson.technology !== undefined &&
          parsedJson.github !== undefined) {
        api.projectsDatabase[projectId].projectName = parsedJson.projectName;
        api.projectsDatabase[projectId].technology = parsedJson.technology;
        api.projectsDatabase[projectId].github = parsedJson.github;
        responseJson.status = 200;
        responseJson.msg = 'Success';
        res.status(responseJson.status).json(parsedJson);
      } else {
        responseJson.status = 404;
        responseJson.msg = 'Project id not found';
        res.status(responseJson.status).json(responseJson);
      }
    }, (err) => {
      responseJson.status = 400;
      responseJson.msg = 'Error, ' + err.message;
      res.status(responseJson.status).json(responseJson);
    });

};

module.exports = api;
