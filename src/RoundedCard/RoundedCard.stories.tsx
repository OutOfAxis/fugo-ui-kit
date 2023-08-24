import { Meta, StoryObj } from "@storybook/react";
import { RoundedCard } from "./index";

const Component = RoundedCard;

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
  name: Component.displayName,
  args: {
    children: "Card content",
  },
};
