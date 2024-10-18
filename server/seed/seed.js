import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import connectDB from "../db/db.js";
import Card from "../models/Card.js";
import Comment from "../models/Comment.js";
import List from "../models/List.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

let usersCreated = [],
  projectsCreated = [],
  listsCreated = [],
  cardsCreated = [],
  commentsCreated = [];

(async function () {
  //Connect to the db
  connectDB();

  //delete all the users
  try {
    await User.deleteMany({});
    console.log("All users deleted");
  } catch (error) {
    console.log(error);
  }

  //delete all the projects
  try {
    await Project.deleteMany({});
    console.log("All projects deleted");
  } catch (error) {
    console.log(error);
  }

  //delete all the lists
  try {
    await List.deleteMany({});
    console.log("All lists deleted");
  } catch (error) {
    console.log(error);
  }

  //delete all the cards
  try {
    await Card.deleteMany({});
    console.log("All cards deleted");
  } catch (error) {
    console.log(error);
  }

  //delete all the comments
  try {
    await Comment.deleteMany({});
    console.log("All comments deleted");
  } catch (error) {
    console.log(error);
  }

  const hashedPassword = await bcrypt.hash("123456789", 10);

  const usersPromises = Array(5)
    .fill(null)
    .map(() => {
      let userName = faker.internet.userName();

      const userData = {
        id: faker.string.uuid(),
        username: userName,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(["Admin", "User"]),
        defaultAvatar: `${userName[0]}.`,
        avatarUrl: faker.image.avatar(),
      };

      console.log(
        `User ${userName} / ${userData.email} / ${userData.password} created - ${userData.role}`
      );

      const user = new User(userData);
      return user.save();
    });

  try {
    usersCreated = await Promise.all(usersPromises);
    console.log("All users created");
  } catch (error) {
    console.log(error);
  }

  //create projects
  const userIds = usersCreated.map((user) => user._id);

  const projectsPromises = Array(20)
    .fill(null)
    .map(() => {
      const projectData = {
        id: faker.string.uuid(),
        name: faker.lorem.words(),
        slug: faker.helpers.slugify(faker.lorem.words()),
        description: faker.lorem.sentence(),
        coverImage: faker.image.url(),
        technologies: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        membersId: [
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement(userIds),
        ],
        createdByUserId: faker.helpers.arrayElement(userIds),
        lists: [],
      };
      console.log(`Project ${projectData.name} created`);

      const project = new Project(projectData);
      return project.save();
    });

  try {
    projectsCreated = await Promise.all(projectsPromises);
    console.log("All projects created");
  } catch (error) {
    console.log(error);
  }

  //create lists
  const projectIds = projectsCreated.map((project) => project._id);

  const listsPromises = Array(30)
    .fill(null)
    .map(() => {
      const listName = faker.word.adjective({ length: { min: 5, max: 7 } });

      const listData = {
        id: faker.string.uuid(),
        name: listName,
        createdByUserId: faker.helpers.arrayElement(userIds),
        projectId: faker.helpers.arrayElement(projectIds),
        slug: faker.helpers.slugify(listName),
        cards: [],
      };
      console.log(`List ${listData.name} created`);

      const list = new List(listData);
      return list.save();
    });

  try {
    listsCreated = await Promise.all(listsPromises);
    console.log("All lists created");
  } catch (error) {
    console.log(error);
  }

  //create cards
  const listIds = listsCreated.map((list) => list._id);
  const cardStatus = listsCreated.map((list) => list.name);

  const cardsPromises = Array(50)
    .fill(null)
    .map(() => {
      const cardData = {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        description: faker.lorem.sentence(),
        createdByUserId: faker.helpers.arrayElement(userIds),
        listId: faker.helpers.arrayElement(listIds),
        duoDate: faker.date.future(),
        status: faker.helpers.arrayElement(cardStatus),
        comments: [],
        assigned: [
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement(userIds),
        ],
        tags: faker.helpers.arrayElements([
          "important",
          "urgent",
          "feature",
          "bug",
          "critical",
        ]),
      };
      console.log(`Card ${cardData.title} created`);

      const card = new Card(cardData);
      return card.save();
    });

  try {
    cardsCreated = await Promise.all(cardsPromises);
    console.log("All cards created");
  } catch (error) {
    console.log(error);
  }

  //create comments
  const cardIds = cardsCreated.map((card) => card._id);

  const commentsPromises = Array(100)
    .fill(null)
    .map(() => {
      const commentData = {
        id: faker.string.uuid(),
        text: faker.lorem.sentence(),
        createdByUserId: faker.helpers.arrayElement(userIds),
        cardId: faker.helpers.arrayElement(cardIds),
      };
      console.log(`Comment ${commentData.text} created`);

      const comment = new Comment(commentData);
      return comment.save();
    });

  try {
    commentsCreated = await Promise.all(commentsPromises);
    console.log("All comments created");
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
})();
