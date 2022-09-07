import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { InputGroup } from "./InputGroup";
import { Input } from "../Input";

const Component = InputGroup;

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
    header: "Input group title",
    description: "Description for input group",
    children: <Input value="" />,
  },
};
