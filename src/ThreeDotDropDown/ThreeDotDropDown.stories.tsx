import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { MenuItem, ThreeDotDropDown } from "./index";

const Component = ThreeDotDropDown;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <ThreeDotDropDown {...props}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </ThreeDotDropDown>
  );
};
Base.storyName = "ThreeDotDropDown";
