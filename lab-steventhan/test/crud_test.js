'use strict';

const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
const Project = require('../model/project');


let server;
let port = 8000;
const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

let testProject;

before((done) => {
  server = require('../_server').listen(port);
  testProject = new Project({
    projectName: 'Test',
    technology: [1, 2, 3],
    github: 'https://github.com/steventhan/my-hng'
  });
  testProject.save((err, project) => {
    testProject = project;
    done();
  });
});

after((done) => {
  mongoose.connection.db.dropDatabase(() => {
    server.close();
    done();
  });
});

describe('the 404 not found', () => {
  it('should return a 404 if route is not registered', (done) => {
    request(`localhost:${port}`)
      .get('/randompage')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.msg).to.eql('404 Not Found');
        done();
      });
  });
});

describe('the POST method', () => {
  it('POST /api/projects should be a 400 bad request if invalid json was posted', (done) => {
    request(`localhost:${port}`)
      .post('/api/projects')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('POST /api/projects should add the project to the database if a valid object is sent', (done) => {
    request(`localhost:${port}`)
      .post('/api/projects')
      .send({
        projectName: 'My HNG',
        technology: ['Python (Flask)', 'SQL (MySQL + SQLAlchemy)', 'CSS (Bootstrap + Insignia bootstrap admin theme)', 'JavaScript (jQuery, WebSockets)', 'Nginx', 'Gunicorn', 'AWS EC2 ubuntu instance'],
        github: 'https://github.com/steventhan/my-hng'
      })
      .end((err, res) => {
        Project.findOne({projectName: 'My HNG'}, (err, project) => {
          expect(res).to.have.status(200);
          expect(project.projectName).to.eql('My HNG');
          done();
        });
      });
  });
});

describe('the GET method', () => {
  it('GET /api/projects/579a409d0c2573a717b20519 should be a 404 for valid request made with an id that was not found', (done) => {
    request(`localhost:${port}`)
      .get('/api/projects/579a409d0c2573a717b20519')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(JSON.parse(res.text).msg).to.eql('404 Not Found');
        done();
      });
  });

  it('GET /api/projects should be a 400 bad request if no id was provided', (done) => {
    request(`localhost:${port}`)
      .get('/api/projects')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(JSON.parse(res.text).msg).to.eql('400 Bad Request');
        done();
      });
  });

  it('GET /api/projects should be a 200 OK if a existing id was provided', (done) => {
    request(`localhost:${port}`)
      .get(`/api/projects/${testProject._id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('the PUT method', () => {
  it('PUT /api/projects should be a 400 bad request if invalid json was put', (done) => {
    request(`localhost:${port}`)
      .put(`/api/projects/${testProject._id}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('PUT /api/projects should be a 404 not found if wrong id is passed in', (done) => {
    request(`localhost:${port}`)
      .put('/api/projects/579a409d0c2573a717b20519')
      .send({
        projectName: 'Test',
        technology: [1, 2, 3],
        github: 'test url'
      })
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('PUT /api/projects should update the id if valid object and id are sent', (done) => {
    request(`localhost:${port}`)
      .put(`/api/projects/${testProject._id}`)
      .send({
        projectName: 'Modified Test',
        technology: [1, 2, 3, 4],
        github: 'test url'
      })
      .end((err, res) => {
        Project.findOne({projectName: 'Modified Test'}, (err, project) => {
          expect(res).to.have.status(200);
          expect(project.projectName).to.eql('Modified Test');
          expect(project.technology.length).to.eql(4);
          expect(project.github).to.eql('test url');
          done();
        });
      });
  });
});
