import { fn } from "@storybook/test";
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: { onClick: fn() },
};

export const Primary = {
  args: {
    label: "Button",
    variation: "primary",
    size: "m",
  },
};

export const Secondary = {
  args: {
    label: "Button",
  },
};

export const Large = {
  args: {
    size: "l",
    label: "Button",
  },
};

export const Small = {
  args: {
    size: "s",
    label: "Button",
  },
};
