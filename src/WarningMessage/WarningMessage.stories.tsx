import { Meta, StoryObj } from "@storybook/react";
import { WarningMessage } from "./WarningMessage";

const Component = WarningMessage;

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
  name: Component.name,
  args: {
    children: "Message that warns",
  },
};
