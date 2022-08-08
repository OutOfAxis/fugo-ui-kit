import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import RoundedCard from "./index";

const Component = RoundedCard;

type Case = ComponentStoryObj<typeof Component>;

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
} as ComponentMeta<typeof Component>;

export const Base: Case = {
  storyName: Component.displayName,
  args: {
    children: "Card content",
  },
};
