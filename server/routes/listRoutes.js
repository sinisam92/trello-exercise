import { Router } from "express";
import {
  listPostValidations,
  listPutValidations,
} from "../validators/listValidations.js";
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
    .post(listPostValidations, createList);

// prettier-ignore
router.route("/:id")
    .get(getListsByProjectId)
    .put(listPutValidations, updateList)
    .delete(deleteList);

router.route("/single/:listId").get(getListById);

export default router;
