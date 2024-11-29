import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import connectDB from "../config/db.config.js";
import Card from "../models/Card.js";
import Comment from "../models/Comment.js";
import List from "../models/List.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

// progress bar imports
import cliProgress from "cli-progress";
import _colors from "ansi-colors";
import chalk from "chalk";

const totalUsers = 15;
const totalProjects = 30;
const totalLists = 100;
const totalCards = 150;
const totalComments = 200;

const totalTasks = totalUsers + totalProjects + totalLists + totalCards + totalComments;

const progressBar = new cliProgress.SingleBar(
  {
    format: `${chalk.green("{bar}")} ${chalk.yellow("{percentage}%")} | ${chalk.green(
      "{value}/{total}"
    )} | ${chalk.magenta("{stage}")}`,
    barCompleteChar: "█",
    barIncompleteChar: "░",
    hideCursor: true,
  },
  cliProgress.Presets.shades_classic
);

let usersCreated = [],
  projectsCreated = [],
  listsCreated = [],
  cardsCreated = [],
  commentsCreated = [];

(async function () {
  console.log(chalk.bold.green("\n=== Seeding Database ===\n"));
  //Connect to the db
  await connectDB();

  progressBar.start(totalTasks, 0, { stage: "Initializing" });

  // Clear the database
  try {
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      List.deleteMany({}),
      Card.deleteMany({}),
      Comment.deleteMany({}),
    ]);

    progressBar.update(5, { stage: "Database cleared" });
  } catch (error) {
    console.error(chalk.red("Error clearing collections:"), error);
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash("123456789", 10);

  const usersPromises = Array(totalUsers)
    .fill(null)
    .map(() => {
      let userName;
      do {
        userName = faker.internet.userName().slice(0, 15);
      } while (userName.length < 5);

      const userData = {
        // id: faker.string.uuid(),
        username: userName,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: hashedPassword,
        role: faker.helpers.arrayElement(["Admin", "User"]),
        defaultAvatar: `${userName[0]}.`,
        avatarUrl: faker.image.avatar(),
        projectsCreated: [],
        projectsMember: [],
      };

      const user = new User(userData);
      return user.save();
    });

  try {
    usersCreated = await Promise.all(usersPromises);
    progressBar.update(totalUsers + 5, { stage: "Users created" });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  //create projects
  const userIds = usersCreated.map((user) => user._id);

  const projectsPromises = Array(totalProjects)
    .fill(null)
    .map(async () => {
      const createdByUserId = faker.helpers.arrayElement(userIds);
      const membersId = [
        faker.helpers.arrayElement(userIds),
        faker.helpers.arrayElement(userIds),
        faker.helpers.arrayElement(userIds),
      ];

      const projectData = {
        id: faker.string.uuid(),
        name: faker.lorem.words(),
        slug: faker.helpers.slugify(faker.lorem.words()),
        description: faker.lorem.sentence(),
        coverImage: faker.image.urlLoremFlickr({ category: "abstract" }),
        // coverImage: faker.image.url(),
        technologies: [faker.lorem.words(), faker.lorem.words(), faker.lorem.words()],
        membersId: membersId,
        createdByUserId: createdByUserId,
        lists: [],
      };
      progressBar.increment(0.5);
      const project = await new Project(projectData).save();

      // this should update the user who created the project with the project id
      try {
        await User.findByIdAndUpdate(createdByUserId, {
          $push: { createdProjects: project._id },
        });
      } catch (error) {
        console.error(
          `Error updating user ${createdByUserId} with project ${projectData.name}:`,
          error
        );
      }

      // this should update the members of the project with the project id

      const updateMembersPromises = membersId.map(async (memberId) => {
        try {
          await User.findByIdAndUpdate(memberId, {
            $push: { memberProjects: project._id },
          });
        } catch (error) {
          console.error(
            `Error updating user ${memberId} with project ${projectData.name}:`,
            error
          );
        }
      });

      await Promise.all(updateMembersPromises);

      return project;
    });

  try {
    projectsCreated = await Promise.all(projectsPromises);
    progressBar.update(totalUsers + totalProjects + 5, { stage: "Projects created" });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  //create lists
  const projectIds = projectsCreated.map((project) => project._id);

  const listsPromises = Array(totalLists)
    .fill(null)
    .map(async () => {
      const listName = faker.word.adjective({ length: { min: 5, max: 7 } });
      const projectId = faker.helpers.arrayElement(projectIds);

      const listData = {
        id: faker.string.uuid(),
        name: listName,
        createdByUserId: faker.helpers.arrayElement(userIds),
        projectId: projectId,
        slug: faker.helpers.slugify(listName),
        cards: [],
      };
      progressBar.increment(0.5);
      const list = await new List(listData).save();

      try {
        await Project.findByIdAndUpdate(projectId, { $push: { lists: list._id } });
      } catch (error) {
        console.error(
          `Error updating project ${projectId} with list ${listData.name}:`,
          error
        );
      }
      return list;
    });

  try {
    listsCreated = await Promise.all(listsPromises);
    progressBar.update(totalUsers + totalProjects + totalLists + 5, {
      stage: "Lists created",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  //create cards
  const listIds = listsCreated.map((list) => list._id);
  const cardStatus = listsCreated.map((list) => list.name);

  const cardsPromises = Array(totalCards)
    .fill(null)
    .map(async () => {
      const listId = faker.helpers.arrayElement(listIds);
      const createdByUserId = faker.helpers.arrayElement(userIds);

      const generateAssignedMembers = () => {
        const additionalUsersCount = faker.helpers.rangeToNumber({ min: 0, max: 2 });

        const additionalUsers = faker.helpers
          .shuffle(userIds)
          .slice(0, additionalUsersCount);

        return [createdByUserId, ...additionalUsers];
      };
      const cardData = {
        id: faker.string.uuid(),
        title: faker.lorem.words(),
        description: faker.lorem.sentence(),
        createdByUserId: createdByUserId,
        listId: listId,
        duoDate: faker.date.future(),
        status: faker.helpers.arrayElement(cardStatus),
        comments: [],
        commentsCount: 0,
        assigned: generateAssignedMembers(),
        tags: faker.helpers.arrayElements([
          "important",
          "urgent",
          "feature",
          "bug",
          "critical",
        ]),
      };
      progressBar.increment(0.5);
      const card = await new Card(cardData).save();

      try {
        await List.findByIdAndUpdate(listId, { $push: { cards: card._id } });
      } catch (error) {
        console.error(
          `Error updating list ${cardData.listId} with card ${cardData.title}:`,
          error
        );
      }

      return card;
    });

  try {
    cardsCreated = await Promise.all(cardsPromises);
    progressBar.update(totalUsers + totalProjects + totalLists + totalCards + 5, {
      stage: "Cards created",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

  //create comments
  const cardIds = cardsCreated.map((card) => card._id);

  const commentsPromises = Array(totalComments)
    .fill(null)
    .map(async () => {
      const cardId = faker.helpers.arrayElement(cardIds);
      const commentData = {
        id: faker.string.uuid(),
        text: faker.lorem.sentence(),
        createdByUserId: faker.helpers.arrayElement(userIds),
        cardId: cardId,
      };
      progressBar.increment(0.5);
      const comment = await new Comment(commentData).save();

      try {
        await Card.findByIdAndUpdate(cardId, {
          $push: { comments: comment._id },
        });
      } catch (error) {
        console.error(
          `Error updating card ${commentData.cardId} with comment ${commentData.text}:`,
          error
        );
      }

      return comment;
    });

  try {
    commentsCreated = await Promise.all(commentsPromises);

    // Updates the commentsCount for each card so we can get number of comments for each card
    const updateCardPromises = cardsCreated.map(async (card) => {
      const commentCount = await Comment.countDocuments({ cardId: card._id });
      return Card.findByIdAndUpdate(card._id, { commentsCount: commentCount });
    });

    await Promise.all(updateCardPromises);
    progressBar.update(totalTasks, { stage: "Comments created" });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
  progressBar.update(totalTasks, { stage: "Done, database seeded!" });
  progressBar.stop();
  console.log(chalk.green("\nDatabase seeded successfully!\n"));

  mongoose.connection.close();
})();
