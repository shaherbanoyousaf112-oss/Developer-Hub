 import Service from "../models/Service.js";

// GET all services
export const getServices = async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
};

// CREATE service
export const createService = async (req, res) => {
  const service = new Service(req.body);
  const saved = await service.save();
  res.json(saved);
};

// UPDATE service
export const updateService = async (req, res) => {
  const updated = await Service.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE service
export const deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};