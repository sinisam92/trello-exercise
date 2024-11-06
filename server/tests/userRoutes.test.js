import request from "supertest";
import app from "../index.js";
import User from "../models/User.js";

describe("get all users", () => {
  it("should return all users", async () => {
    const usersInDb = await User.find();
    const userCount = usersInDb.length;

    const response = await request(app).get("/users");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(userCount);
  });
});
