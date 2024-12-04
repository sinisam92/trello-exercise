import request from "supertest";
import app from "../index.js";
import {
  testListObject,
  testCardObject,
  testCommentObject,
  testProjectObject,
  testUserObject,
} from "./jest.setup.js";
import User from "../models/User.js";
import Project from "../models/Project.js";
import List from "../models/List.js";
import Card from "../models/Card.js";
import Comment from "../models/Comment.js";

let userFromDb;
let projectFromDb;
let listFromDb;
let cardFromDb;
let commentFromDb;

// users
beforeEach(async () => {
  const uniqueEmail = `example${Date.now()}${Math.floor(Math.random() * 10000)}@test.com`;

  userFromDb = await User.create({ ...testUserObject, email: uniqueEmail });
});

// projects
beforeEach(async () => {
  let projectToCreate = {
    ...testProjectObject,
    createdByUserId: userFromDb._id,
  };

  projectFromDb = await Project.create(projectToCreate);
});

// lists
beforeEach(async () => {
  let listToCreate = {
    ...testListObject,
    projectId: projectFromDb._id,
    createdByUserId: userFromDb._id,
  };

  listFromDb = await List.create(listToCreate);
});

// cards
beforeEach(async () => {
  let cardToCreate = {
    ...testCardObject,
    listId: listFromDb._id,
    createdByUserId: userFromDb._id,
  };

  cardFromDb = await Card.create(cardToCreate);
});

// comments
beforeEach(async () => {
  let commentToCreate = {
    ...testCommentObject,
    cardId: cardFromDb._id,
    createdByUserId: userFromDb._id,
  };

  commentFromDb = await Comment.create(commentToCreate);
});

describe("Comment Routes", () => {
  it("should get all comments", async () => {
    const res = await request(app).get("/comments");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body).not.toHaveLength(0);
  });

  it("should get a comment by id", async () => {
    const commentId = commentFromDb._id;
    const res = await request(app).get(`/comments/${commentId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("text");
  });

  it("should delete a comment by id", async () => {
    const commentId = commentFromDb._id;
    const res = await request(app).delete(`/comments/${commentId}`);
    expect(res.statusCode).toEqual(204);
  });
});
