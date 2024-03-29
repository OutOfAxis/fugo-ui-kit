import { Meta, StoryFn } from "@storybook/react";
import { MenuItem, ThreeDotDropDown } from "./index";

const Component = ThreeDotDropDown;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <ThreeDotDropDown {...props}>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </ThreeDotDropDown>
  );
};
Base.name = "ThreeDotDropDown";

export const Rotated: CaseFn = (props) => {
  return (
    <ThreeDotDropDown {...props} rotate>
      <MenuItem>Item 1</MenuItem>
      <MenuItem>Item 2</MenuItem>
      <MenuItem>Item 3</MenuItem>
    </ThreeDotDropDown>
  );
};
