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
    size: "xs",
    label: "Button",
    variation: "primary",
  },
};

export const Large = {
  args: {
    size: "l",
    label: "Button",
    variation: "primary",
  },
};

export const Small = {
  args: {
    size: "s",
    label: "Button",
    variation: "primary",
  },
};
