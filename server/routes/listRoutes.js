import { Router } from "express";
import {
  createList,
  getAllLists,
  getListById,
  getListsByProjectId,
  updateList,
  deleteList,
} from "../controllers/listController.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(getAllLists)
    .post(createList);

// prettier-ignore
router.route("/:id")
    .get(getListsByProjectId)
    .put(updateList)
    .delete(deleteList);

router.route("/single/:listId").get(getListById);

export default router;
