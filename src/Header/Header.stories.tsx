import { Meta, StoryObj } from "@storybook/react";
import { Header } from "./index";

const Component = Header;

type Case = StoryObj<typeof Component>;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
  },
  args: {
    children: "Header title",
  },
  argTypes: {},
} as Meta<typeof Component>;

export const Base: Case = {};

export const Mobile: Case = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
