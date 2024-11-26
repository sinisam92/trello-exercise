import { validationResult } from "express-validator";
import Card from "../models/Card.js";

export const getAllCard = async (_req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error during fetching cards:", error);
    res.status(500).json({ error: "Error fetching cards!" });
  }
};

export const getCardByListsIds = async (req, res) => {
  const { listIds } = req.query;
  console.log("listIds----->", listIds);
  try {
    const listIdsDecoded = await JSON.parse(decodeURIComponent(listIds));
    const card = await Card.find({
      listId: { $in: listIdsDecoded },
    });
    console.log("cards----->", card);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error("Error during fetching list:", error);
    res.status(500).json({ error: "Error fetching list!" });
  }
};

export const createCard = async (req, res) => {
  const newCard = req.body;

  try {
    const listToAdd = new Card(newCard);

    await listToAdd.save();
    res.status(201).json(listToAdd);
  } catch (error) {
    console.error("Error during list creation:", error);
    res.status(500).json({ error: "Error creating list!" });
  }
};

export const deleteCard = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const list = await Card.findOneAndDelete({ _id: paramsId });

    if (!list) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during list deletion:", error);
    res.status(500).json({ error: "Error deleting list!" });
  }
};

export const updateCard = async (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errror: errors.array() });
  //   }
  const paramsId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedCard = await Card.findOneAndUpdate({ _id: paramsId }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCard) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(updatedCard);
  } catch (error) {
    console.error("Error during list update:", error);
    res.status(500).json({ error: "Error updating list!" });
  }
};

export const getCardsWithComments = async (req, res) => {
  const { id: cardId } = req.params;

  try {
    const card = await Card.findById(cardId).populate("comments");

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.json(card);
  } catch (error) {
    console.error("Error fetching card with lists:", error);
    res.status(500).json({ error: "Error fetching card with lists!" });
  }
};
