import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ButtonWarning } from "./";

const Component = ButtonWarning;

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
  name: Component.name,
};
