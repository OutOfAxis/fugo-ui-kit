import { Meta, StoryFn } from "@storybook/react";
import { ButtonDropDown, MenuItem } from "./ButtonDropDown";

const Component = ButtonDropDown;

type CaseFn = StoryFn<typeof Component>;

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
  subcomponents: {
    MenuItem,
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <ButtonDropDown {...props}>
      <MenuItem>Item A</MenuItem>
      <MenuItem>Item B</MenuItem>
    </ButtonDropDown>
  );
};
Base.name = Component.name;
Base.args = {
  label: "Button drop down",
};
