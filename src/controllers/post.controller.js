import postModel from "../models/post.model.js";

const createPost = async (req, res) => {
  try {
    console.log(req.user);
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }
    const newPost = await postModel.create({
      title,
      content,
      tags,
      author: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create post" });
  }
};

const getPosts = async (req, res) => {
  try {
    // 1. Query params
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";

    // 2. Search query (title OR content)
    const query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
    };

    const totalPosts = await postModel.countDocuments(query);

    // 4. Fetch posts with pagination
    const posts = await postModel
      .find(query)

      .skip((page - 1) * limit)
      .limit(limit);

    // 5. Response
    res.status(200).json({
      
      totalPost: totalPosts,
      page,
      limit,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};
export const getSinglePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post fetched successfully",
      post});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updated = await postModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await postModel.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { createPost, getPosts, getSinglePost, updatePost, deletePost };
