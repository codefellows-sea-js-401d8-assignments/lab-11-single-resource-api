'use strict';

const jsonParser = require('../lib/json_parser');
const Project = require('../model/project');

let api = {};

api.homepageGet = (req, res) => {
  res.status(200).send('For project API, please go to /api/projects');
};

api.projectsGetAll = (req, res) => {
  let projectsArray = [];
  for (let key in api.projectsDatabase) {
    projectsArray.push(api.projectsDatabase[key]);
  }
  res.status(200).json(projectsArray);
};

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

api.projectsPost = (req, res) => {
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
    let project = new Project(parsedJson.projectName, parsedJson.technology, parsedJson.github);
    while(api.projectsDatabase[project.id] !== undefined) {
      project.getNewId();
    }
    api.projectsDatabase[project.id] = project;
    responseJson.status = 200;
    responseJson.msg = 'Success';
    return res.status(responseJson.status).json(project);
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
