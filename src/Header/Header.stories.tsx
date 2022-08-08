import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import Header from "./index";

const Component = Header;

type Case = ComponentStoryObj<typeof Component>;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
  },
  argTypes: {
    children: {
      type: "string",
      defaultValue: "Header title",
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: Case = {};

export const Mobile: Case = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
