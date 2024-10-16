import { Router } from "express";
import {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(getAllComment)
    .post(createComment);

// prettier-ignore
router.route("/:id")
    .get(getCommentById)
    .put(updateComment)
    .delete(deleteComment);

export default router;
