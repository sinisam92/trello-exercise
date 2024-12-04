import { validationResult } from "express-validator";
import Card from "../models/Card.js";
import List from "../models/List.js";

export const getAllCard = async (_req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error("Error during fetching cards:", error);
    res.status(500).json({ error: "Error fetching cards!" });
  }
};

export const getCardById = async (req, res) => {
  const cardId = req.params.id;

  try {
    const card = await Card.findById(cardId);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(card);
  } catch (error) {
    console.error("Error during fetching card:", error);
    res.status(500).json({ error: "Error fetching card!" });
  }
};

export const getCardByListsIds = async (req, res) => {
  const { listIds } = req.query;
  try {
    const listIdsDecoded = await JSON.parse(decodeURIComponent(listIds));
    const card = await Card.find({
      listId: { $in: listIdsDecoded },
    });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.status(200).json(card);
  } catch (error) {
    console.error("Error during fetching cards:", error);
    res.status(500).json({ error: "Error fetching cards!" });
  }
};

export const createCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
  try {
    const newCard = req.body;

    const cardToAdd = new Card(newCard);

    const list = await List.findById(newCard.listId);

    if (!list) {
      return res.status(404).json({ error: "List not found!" });
    }

    list.cards.push(cardToAdd._id);

    await list.save();
    await cardToAdd.save();
    res.status(201).json(cardToAdd);
  } catch (error) {
    console.error("Error during card creation:", error);
    res.status(500).json({ error: "Error creating card!" });
  }
};

export const deleteCard = async (req, res) => {
  const paramsId = req.params.id;

  try {
    const card = await Card.findOneAndDelete({ _id: paramsId });

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error during card deletion:", error);
    res.status(500).json({ error: "Error deleting card!" });
  }
};

export const updateCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() });
  }
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
    console.error("Error during card update:", error);
    res.status(500).json({ error: "Error updating card!" });
  }
};

export const getCardWithComments = async (req, res) => {
  const { cardId } = req.params;

  try {
    const card = await Card.findById(cardId).populate("comments");

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    res.status(201).json(card);
  } catch (error) {
    console.error("Error fetching card with cards:", error);
    res.status(500).json({ error: "Error fetching card with cards!" });
  }
};
