import { Router } from "express";
import {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentByCardCommentsIds,
} from "../controllers/commentController.js";

const router = Router();
router.route("/by-comment-ids").get(getCommentByCardCommentsIds);

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
