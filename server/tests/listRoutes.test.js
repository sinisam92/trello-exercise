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

describe("List Routes", () => {
  it("should get all lists", async () => {
    const response = await request(app).get("/lists");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toHaveLength(0);
  });

  it("should get a list by ID", async () => {
    const response = await request(app).get(`/lists/single/${listFromDb._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id", listFromDb._id);
  });

  it("should get lists by project ID", async () => {
    const response = await request(app).get(`/lists/${listFromDb._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should update a list", async () => {
    const response = await request(app)
      .put(`/lists/${listFromDb._id}`)
      .send({ name: "Updated List" });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Updated List");
  });

  it("should delete a list", async () => {
    const response = await request(app).delete(`/lists/${listFromDb._id}`);
    expect(response.status).toBe(204);
  });
});
