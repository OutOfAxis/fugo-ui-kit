import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import SplitButtonDropDown, { MenuItem } from "./SplitButtonDropDown";

const Component = SplitButtonDropDown;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
    docs: {
      description: {
        component: ``,
      },
    },
  },
  args: {},
  argTypes: {},
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <SplitButtonDropDown {...props}>
      <MenuItem>Main action</MenuItem>
      <MenuItem>Menu item A</MenuItem>
      <MenuItem>Menu item B</MenuItem>
    </SplitButtonDropDown>
  );
};
Base.args = {
  label: "Main action",
};

export const Mobile: CaseFn = (props) => {
  return (
    <SplitButtonDropDown {...props}>
      <MenuItem>Main action</MenuItem>
      <MenuItem>Menu item A</MenuItem>
      <MenuItem>Menu item B</MenuItem>
    </SplitButtonDropDown>
  );
};
Mobile.args = {
  label: "Main action",
};
Mobile.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
