import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { WarningMessage } from "./WarningMessage";

const Component = WarningMessage;

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
    children: "Message that warns",
  },
};
