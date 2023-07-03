import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ButtonSecondaryAlt } from "./";

const Component = ButtonSecondaryAlt;

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

export const Base: Case = {
  name: Component.name,
};
