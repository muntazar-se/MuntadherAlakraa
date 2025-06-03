const Project = require("../models/projectModel");

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  if (!projects) {
    console.log("projects noooot found");
  } else {
    console.log(`HERE IS THE PROJECTS${projects}`);

    res.json(projects);
  }
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted successfully" });
};
