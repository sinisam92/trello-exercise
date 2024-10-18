import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import connectDB from '../db/db.js';
import Card from '../models/Card.js';
import Comment from '../models/Comment.js';
import List from '../models/List.js';
import Project from '../models/Project.js';
import User from '../models/User.js';

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
    console.log('All users deleted');
  } catch (error) {
    console.log(error);
  }

  //delete all the projects
  try {
    await Project.deleteMany({});
    console.log('All projects deleted');
  } catch (error) {
    console.log(error);
  }

  //delete all the lists
  try {
    await List.deleteMany({});
    console.log('All lists deleted');
  } catch (error) {
    console.log(error);
  }

  //delete all the cards
  try {
    await Card.deleteMany({});
    console.log('All cards deleted');
  } catch (error) {
    console.log(error);
  }

  //delete all the comments
  try {
    await Comment.deleteMany({});
    console.log('All comments deleted');
  } catch (error) {
    console.log(error);
  }

  const hashedPassword = await bcrypt.hash('123456789', 10);

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
        role: faker.helpers.arrayElement(['Admin', 'User']),
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
    console.log('All users created');
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
    console.log('All projects created');
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
})();
