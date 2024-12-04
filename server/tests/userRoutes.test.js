import request from "supertest";
import app from "../index.js";
import Card from "../models/Card.js";
import Comment from "../models/Comment.js";
import List from "../models/List.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import {
  testCardObject,
  testCommentObject,
  testListObject,
  testProjectObject,
  testUserObject,
} from "./jest.setup.js";

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

describe("testing user routes", () => {
  it("delete a user", async () => {
    const response = await request(app).delete(`/users/${userFromDb._id}`);

    expect(response.statusCode).toBe(204);
  });
  it("get a user", async () => {
    const response = await request(app).get(`/users/${userFromDb._id}`);

    expect(response.statusCode).toBe(200);
  });

  it("update a user", async () => {
    const response = await request(app)
      .put(`/users/${userFromDb._id}`)
      .send({ firstName: "Updated" });

    expect(response.statusCode).toBe(201);
    expect(response.body.firstName).toBe("Updated");
  });
  it("get all users", async () => {
    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).not.toHaveLength(0);
  });
});
