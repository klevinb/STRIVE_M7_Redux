const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  repoUrl: {
    type: String,
    required: true,
  },
  liveUrl: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
