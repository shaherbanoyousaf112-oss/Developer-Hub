import Project from "../models/Project.js";

// ✅ GET all projects (USER + ADMIN)
export const getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// ✅ CREATE project (ADMIN)
export const createProject = async (req, res) => {
  const project = new Project(req.body);
  const saved = await project.save();
  res.json(saved);
};

// ✅ UPDATE project (ADMIN)
export const updateProject = async (req, res) => {
  const updated = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// ✅ DELETE project (ADMIN)
export const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};