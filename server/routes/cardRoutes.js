import { Router } from "express";
import {
  createCard,
  getAllCard,
  getCardById,
  updateCard,
  deleteCard,
} from "../controllers/cardController.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(getAllCard)
    .post(createCard);

// prettier-ignore
router.route("/:id")
    .get(getCardById)
    .put(updateCard)
    .delete(deleteCard);

export default router;
