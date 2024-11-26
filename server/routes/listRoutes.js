import { Router } from "express";
import {
  createList,
  getAllLists,
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
    // .get(getListById)
    .get(getListsByProjectId)
    .put(updateList)
    .delete(deleteList);

export default router;
