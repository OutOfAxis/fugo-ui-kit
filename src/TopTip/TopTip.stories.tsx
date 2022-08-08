import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import TopTip from "./index";

const Component = TopTip;

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
  storyName: Component.name,
  args: {
    children: "Tip content",
  },
};
