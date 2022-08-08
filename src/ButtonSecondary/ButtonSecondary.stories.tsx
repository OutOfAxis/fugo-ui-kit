import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import ButtonSecondary from "./";

const Component = ButtonSecondary;

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
