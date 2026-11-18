import { Router } from "express";
import {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

const router = Router();

router.route("/").post(createPost).get(getPosts);
router.route("/:id").get(getSinglePost).put(updatePost).delete(deletePost);

export default router;
