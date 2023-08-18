import { Meta, StoryObj } from "@storybook/react";
import { InputGroup } from "./InputGroup";
import { Input } from "../Input";

const Component = InputGroup;

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
    header: "Input group title",
    description: "Description for input group",
    children: <Input value="" />,
  },
};
