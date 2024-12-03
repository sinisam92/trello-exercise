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

describe("Project Routes", () => {
  it("should create a new project", async () => {
    const newProject = { ...projectFromDb, name: "" };
    const response = await request(app).post("/projects").send(newProject);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should get a project by ID", async () => {
    const projectId = projectFromDb._id;
    const response = await request(app).get(`/projects/${projectId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", projectId);
  });

  it("should update a project", async () => {
    const projectId = projectFromDb._id;
    const updatedProject = {
      name: "Updated Project",
    };
    const response = await request(app)
      .put(`/projects/${projectId}`)
      .send(updatedProject)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", updatedProject.name);
  });

  it("should delete a project", async () => {
    const projectId = projectFromDb._id;
    const response = await request(app).delete(`/projects/${projectId}`);
    expect(response.status).toBe(204);
  });
});
