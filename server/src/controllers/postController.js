import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ success: false, message: "Title, content and author are all required" });
  }

  try {
    const newPost = await Post.create({ title, content, author });
    res.status(201).json({ success: true, message: "Post created", data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create post", error: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "username email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch posts", error: err.message });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch post", error: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post updated successfully", data: post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update post", error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete post", error: err.message });
  }
};
