import { Router } from "express";
import {
  createCard,
  getAllCard,
  getCardById,
  updateCard,
  deleteCard,
  getCardsWithComments,
} from "../controllers/cardController.js";

const router = Router();

// prettier-ignore
router.route("/")
    .get(getAllCard)
    .post(createCard);

// prettier-ignore
router.route("/:id")
    // .get(getCardById)
    .get(getCardsWithComments)
    .put(updateCard)
    .delete(deleteCard);

export default router;
