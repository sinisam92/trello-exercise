import { Router } from "express";
import {
  createCard,
  getAllCard,
  getCardById,
  getCardByListsIds,
  updateCard,
  deleteCard,
  getCardWithComments,
} from "../controllers/cardController.js";
import {
  cardPostValidations,
  cardPutValidations,
} from "../validators/cardValidations.js";

const router = Router();
router.route("/by-list-ids").get(getCardByListsIds);
router.route("/with-comments/:cardId").get(getCardWithComments);

// prettier-ignore
router.route("/")
    .get(getAllCard)
    .post(cardPostValidations, createCard);

// prettier-ignore
router.route("/:id")
    .get(getCardById)
    .put(cardPutValidations, updateCard)
    .delete(deleteCard);

export default router;
