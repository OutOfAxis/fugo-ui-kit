import { Meta, StoryObj } from "@storybook/react";
import { TopTip } from "./index";

const Component = TopTip;

type Case = StoryObj<typeof Component>;

export default {
  component: Component,
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
  args: {},
  argTypes: {},
} as Meta<typeof Component>;

export const Base: Case = {
  storyName: Component.name,
  args: {
    children: "Tip content",
  },
};
