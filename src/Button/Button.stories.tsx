import { Button } from "./";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";

const Component = Button;

type Case = ComponentStoryObj<typeof Component>;

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

export const ExtraSmall: Case = {
  args: {
    extraSmall: true,
  },
};
