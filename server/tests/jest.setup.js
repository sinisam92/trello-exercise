import mongoose from "mongoose";
import User from "../models/User.js";
import Project from "../models/Project.js";
import List from "../models/List.js";
import Card from "../models/Card.js";
import Comment from "../models/Comment.js";

// let userFromDb;
// let projectFromDb;
// let listFromDb;
// let cardFromDb;
// let commentFromDb;
export const testUserObject = {
  username: "Mallie_Han29939993",
  firstName: "Tania",
  lastName: "Goyette",
  role: "Admin",
  defaultAvatar: "M.",
  avatarUrl: "https://avatars.githubusercontent.com/u/87281755",
  createdProjects: ["ac63bb2a-cf48-4e34-9d0b-619ea83bcf62"],
  memberProjects: [
    "45a1444d-4ecf-4304-84e9-b829ec47921b",
    "8fe35862-9fed-4a59-89b3-cfcccfd43b25",
    "8fe35862-9fed-4a59-89b3-cfcccfd43b25",
    "90f7e4ab-9ec7-42c6-b01d-bc9cf8d9aee8",
    "39dea731-f960-4482-85d8-ab3e3711d58e",
    "356c39a7-c223-4dad-b70c-63156331cd83",
  ],
  createdAt: "2024-11-27T23:22:29.319Z",
  updatedAt: "2024-11-27T23:22:31.507Z",
  fullName: "Tania Goyette",
  password: "Sin@12345",
};

export const testProjectObject = {
  slug: "substantia-creta-articulus",
  name: "terminatio arguo timor",
  lists: ["0284337d-2256-4404-9e25-ba6d304df4aa", "9ff2e7f9-766a-457d-b6b9-25fe3b7c534d"],
  coverImage: "https://loremflickr.com/552/2157/abstract?lock=4967859851327515",
  technologies: [
    "coniecto placeat adduco",
    "coerceo conatus baiulus",
    "truculenter appono pauci",
  ],
  membersId: [
    "8bd7ef6f-5c2a-4194-93c4-34b7e86b8272",
    "a627aa28-8c77-4c8b-844d-1087cf6ce4df",
    "580e3b62-6054-4904-b405-fea0869099f3",
  ],
  updates: [],
};

export const testListObject = {
  name: "short",
  slug: "short",
  cards: [],
};

export const testCardObject = {
  title: "debilito spoliatio patruus",
  description: "Toties suffoco audeo vereor earum volva tum.",
  status: "phony",
  assigned: [
    "511a2204-8a21-491b-af2e-a8585396c179",
    "3fbcb9cd-2bf8-4428-8463-58ee94969c5a",
    "8bd7ef6f-5c2a-4194-93c4-34b7e86b8272",
  ],
  tags: ["urgent", "critical", "important", "feature", "bug"],
  comments: ["c62555fe-e29a-45ad-9830-2ad50d651052"],
  commentsCount: 1,
};

export const testCommentObject = {
  text: "Vinculum tergum cruentus deprecator caveo vallum.",
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// clean up the database
// beforeEach(async () => {
//   await User.deleteMany({});
//   await Project.deleteMany({});
//   await List.deleteMany({});
//   await Card.deleteMany({});
//   await Comment.deleteMany({});
// });

// users
// beforeEach(async () => {
//   const uniqueEmail = `example${Date.now()}${Math.floor(Math.random() * 10000)}@test.com`;

//   userFromDb = await User.create({ ...testUserObject, email: uniqueEmail });
// });

// // projects
// beforeEach(async () => {
//   let projectToCreate = {
//     ...testProjectObject,
//     createdByUserId: userFromDb._id,
//   };

//   projectFromDb = await Project.create(projectToCreate);
// });

// // lists
// beforeEach(async () => {
//   let listToCreate = {
//     ...testListObject,
//     projectId: projectFromDb._id,
//     createdByUserId: userFromDb._id,
//   };

//   listFromDb = await List.create(listToCreate);
// });

// // cards
// beforeEach(async () => {
//   let cardToCreate = {
//     ...testCardObject,
//     listId: listFromDb._id,
//     createdByUserId: userFromDb._id,
//   };

//   cardFromDb = await Card.create(cardToCreate);
// });

// // comments
// beforeEach(async () => {
//   let commentToCreate = {
//     ...testCommentObject,
//     cardId: cardFromDb._id,
//     createdByUserId: userFromDb._id,
//   };

//   commentFromDb = await Comment.create(commentToCreate);
// });

// clean up the database
// afterEach(async () => {});

afterAll(async () => {
  await User.deleteMany({});
  await Project.deleteMany({});
  await List.deleteMany({});
  await Card.deleteMany({});
  await Comment.deleteMany({});
  await mongoose.connection.close();
});

// export { userFromDb, projectFromDb, listFromDb, cardFromDb, commentFromDb };
