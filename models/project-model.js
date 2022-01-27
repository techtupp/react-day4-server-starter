// models/project-model.js

const mongoose = require('mongoose');
// const User = require('./user-model');
const Schema   = mongoose.Schema;
 

const projectSchema = new Schema({
  title: String,
  description: String,
  tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
  owner: {type: Schema.Types.ObjectId, ref: 'User'}
  // owner will be added later on
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;