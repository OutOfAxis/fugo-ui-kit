import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import ButtonPrimary from "./";

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
