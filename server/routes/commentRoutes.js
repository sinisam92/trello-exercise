import { Router } from "express";
import {
  createComment,
  getAllComment,
  getCommentById,
  updateComment,
  deleteComment,
  getCommentByCardCommentsIds,
} from "../controllers/commentController.js";
import { commentValidations } from "../validators/commentValidations.js";

const router = Router();
router.route("/by-comment-ids").get(getCommentByCardCommentsIds);

// prettier-ignore
router.route("/")
    .get(getAllComment)
    .post(commentValidations, createComment);

// prettier-ignore
router.route("/:id")
    .get(getCommentById)
    // .put(updateComment)
    .delete(deleteComment);

export default router;
