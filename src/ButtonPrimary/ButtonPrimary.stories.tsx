import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ButtonPrimary } from "./";

const Component = ButtonPrimary;

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

export const Base: Case = {
  name: Component.displayName,
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
