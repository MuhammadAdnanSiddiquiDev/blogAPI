import express from "express";
import protect from "../middleware/auth.Middleware.js";
import postController from "../controllers/post.controller.js";

const router = express.Router();

router.post("/createPost", protect, postController.createPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getSinglePost);
router.put("/:id", protect, postController.updatePost);
router.delete("/:id", protect, postController.deletePost);

export default router;
