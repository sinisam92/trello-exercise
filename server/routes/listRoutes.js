import { Router } from "express";
import {
  createList,
  getAllLists,
  getListById,
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
    .get(getListById)
    .put(updateList)
    .delete(deleteList);

export default router;
