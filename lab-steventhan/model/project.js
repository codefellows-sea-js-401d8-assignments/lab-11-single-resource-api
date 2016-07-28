'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectName: String,
  technology: [],
  github: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
