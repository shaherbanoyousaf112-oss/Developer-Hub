import Blog from "../models/Blog.js";

export const getBlogs = async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
};

export const createBlog = async (req, res) => {
  const blog = new Blog(req.body);
  const saved = await blog.save();
  res.json(saved);
};

export const updateBlog = async (req, res) => {
  const updated = await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteBlog = async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog deleted" });
};