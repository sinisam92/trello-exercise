import { v4 as uuidv4 } from "uuid";

const projects = [
  {
    id: uuidv4(),
    name: "Task Management",
    slug: "task-management",
    description: "A simple task management app",
    coverImage: "src/assets/images/project3.jpg",
    technologies: ["React", "Tailwind CSS"],
    dateAdded: "2024-09-01",
    createdBy: "Sinisa",
    members: ["Sinisa"],
    lists: [
      {
        id: uuidv4(),

        name: "Planning",
        slug: "planning",
        dateAdded: "2024-09-01",
        cards: [
          {
            id: uuidv4(),
            title: "Planning Task 1",
            description: "Description of task 1",
            dateAdded: "2024-09-01",
            dueDate: "2024-12-31",
            assigned: [],
            status: "planning",
            tags: ["important", "critical"],
            comments: [],
          },
          {
            id: uuidv4(),
            title: "Planning Task 2",
            description: "Description of task 2",
            dateAdded: "2024-09-01",
            dueDate: "2024-12-31",
            assigned: [],
            status: "planning",
            tags: ["urgent", "feature"],
            comments: [],
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Todo",
        slug: "todo",
        dateAdded: "2024-08-01",
        cards: [
          {
            id: uuidv4(),
            title: "Todo Task 1",
            description: "Description of task 1",
            dateAdded: "2024-07-01",
            dueDate: "2025-12-31",
            assigned: ["Sinisa"],
            status: "todo",
            tags: ["important", "critical"],
            comments: [],
          },
          {
            id: uuidv4(),
            title: "Todo Task 2",
            description: "Description of task 2",
            dateAdded: "2024-08-01",
            dueDate: "2023-05-08",
            assigned: ["Sinisa"],
            status: "todo",
            tags: ["urgent", "bug"],
            comments: [],
          },
          {
            id: uuidv4(),
            title: "Todo Task 3",
            description: "Description of task 3",
            dateAdded: "2024-10-01",
            dueDate: "2024-12-31",
            assigned: ["Sinisa"],
            status: "todo",
            tags: ["default"],
            comments: [],
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Done",
        slug: "done",
        dateAdded: "2024-09-01",
        cards: [
          {
            id: uuidv4(),
            title: "Done Task 5",
            description: "Description of task 5",
            dateAdded: "2024-12-01",
            dueDate: "2024-12-31",
            assigned: ["Sinisa"],
            status: "done",
            tags: ["important", "critical"],
            comments: [],
          },
        ],
      },
    ],
  },
  {
    id: uuidv4(),
    name: "Task Management 2",
    slug: "task-management",
    description: "A simple task management app",
    coverImage: "src/assets/images/project3.jpg",
    technologies: ["React", "Tailwind CSS"],
    dateAdded: "2024-09-01",
    createdBy: "Anna",
    members: ["Anna"],
    lists: [
      {
        id: uuidv4(),

        name: "Planning",
        slug: "planning",
        dateAdded: "2024-09-01",
        cards: [
          {
            id: uuidv4(),
            title: "Planning Task 1",
            description: "Description of task 1",
            dateAdded: "2024-09-01",
            dueDate: "2024-12-31",
            assigned: [],
            status: "planning",
            tags: ["important", "critical"],
            comments: [],
          },
          {
            id: uuidv4(),
            title: "Planning Task 2",
            description: "Description of task 2",
            dateAdded: "2024-09-01",
            dueDate: "2024-12-31",
            assigned: [],
            status: "planning",
            tags: ["urgent", "feature"],
            comments: [],
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Todo",
        slug: "todo",
        dateAdded: "2024-08-01",
        cards: [
          {
            id: uuidv4(),
            title: "Todo Task 1",
            description: "Description of task 1",
            dateAdded: "2024-07-01",
            dueDate: "2025-12-31",
            assigned: ["Sinisa"],
            status: "todo",
            tags: ["important", "critical"],
            comments: [],
          },
          {
            id: uuidv4(),
            title: "Todo Task 2",
            description: "Description of task 2",
            dateAdded: "2024-08-01",
            dueDate: "2023-05-08",
            assigned: ["Sinisa"],
            status: "todo",
            tags: ["urgent", "bug"],
            comments: [],
          },
          {
            id: uuidv4(),
            title: "Todo Task 3",
            description: "Description of task 3",
            dateAdded: "2024-10-01",
            dueDate: "2024-12-31",
            assigned: ["Sinisa"],
            status: "todo",
            tags: ["default"],
            comments: [],
          },
        ],
      },
      {
        id: uuidv4(),
        name: "Done",
        slug: "done",
        dateAdded: "2024-09-01",
        cards: [
          {
            id: uuidv4(),
            title: "Done Task 5",
            description: "Description of task 5",
            dateAdded: "2024-12-01",
            dueDate: "2024-12-31",
            assigned: ["Sinisa"],
            status: "done",
            tags: ["important", "critical"],
            comments: [],
          },
        ],
      },
    ],
  },
];

export default projects;
