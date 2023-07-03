import { ComponentMeta, ComponentStoryObj, StoryFn } from "@storybook/react";
import { ButtonSubmit } from "./";

const Component = ButtonSubmit;

type Case = ComponentStoryObj<typeof Component>;

export default {
  component: Component,
  args: {
    children: "Button",
  },
  argTypes: {
    onClick: {
      type: "function",
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: Case = {};

export const InForm: StoryFn<{ onSubmit: any }> = ({ onSubmit }) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(e);
    }}
  >
    <Component>Submit</Component>
  </form>
);
InForm.argTypes = {
  onSubmit: {
    type: "function",
  },
};
