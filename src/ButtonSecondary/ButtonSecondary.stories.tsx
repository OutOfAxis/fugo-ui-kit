import { Meta, StoryObj } from "@storybook/react";
import { ButtonSecondary } from "./";

const Component = ButtonSecondary;

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
