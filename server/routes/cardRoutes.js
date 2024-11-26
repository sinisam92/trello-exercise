import { Router } from "express";
import {
  createCard,
  getAllCard,
  // getCardById,
  getCardByListsIds,
  updateCard,
  deleteCard,
  getCardsWithComments,
} from "../controllers/cardController.js";

const router = Router();
router.route("/by-list-ids").get(getCardByListsIds);

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
