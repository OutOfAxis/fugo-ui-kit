import { Meta, StoryObj } from "@storybook/react";
import { ButtonDanger } from "./";

const Component = ButtonDanger;

type Case = StoryObj<typeof Component>;

export default {
  component: Component,
  args: {
    children: "Button",
  },
  argTypes: {
    onClick: {
      type: "function",
    },
  },
} as Meta<typeof Component>;

export const Base: Case = {
  name: Component.name,
};
