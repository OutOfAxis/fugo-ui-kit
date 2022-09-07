import { Button } from "./";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

const Component = Button;

type Case = ComponentStoryObj<typeof Component>;

export default {
  component: Component,
  argTypes: {
    children: {
      type: "string",
      defaultValue: "Button",
    },
    onClick: {
      type: "function",
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: Case = {};

export const Loading: Case = {
  args: {
    isLoading: true,
  },
};

export const Disabled: Case = {
  args: {
    disabled: true,
  },
};

export const Small: Case = {
  args: {
    small: true,
  },
};
