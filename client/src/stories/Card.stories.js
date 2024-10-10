import { fn } from "@storybook/test";
import Card from "../components/Card";

export default {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: { onClick: fn() },
};
const users = [
  {
    avatarUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    defaultAvatar: "S",
    id: "24ffd3f3-d1dd-4bae-8b31-fb6a67f11620",
    username: "Sinisa",
  },
];
export const WithAllArgs = {
  args: {
    card: {
      title: "Task 1",
      description: "Description of task 1",
      dueDate: "",
      status: "planing",
      assigned: ["Sinisa"],
      tags: ["important", "critical"],
      comments: [],
    },
    users: users,
  },
};

export const WithoutAvatar = {
  args: {
    card: {
      title: "Task 2",
      description: "Description of task 2",
      dueDate: "",
      status: "in progress",
      assigned: [],
      tags: ["urgent"],
      comments: [],
    },
    users: users,
  },
};
export const WithoutTagsAndAvatar = {
  args: {
    card: {
      title: "Task 2",
      description: "Description of task 2",
      dueDate: "",
      status: "in progress",
      assigned: [],
      tags: [],
      comments: [],
    },
    users: users,
  },
};
