import { MenuButton, MenuList, MenuItem, Menu } from "./Menu";
import { Meta, StoryFn } from "@storybook/react";
import { ButtonPrimary } from "../ButtonPrimary";

const Component = Menu;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  args: {
    color: "light",
  },
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `[Original component](https://reach.tech/menu-button).`,
      },
    },
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <Menu {...props}>
      <MenuButton>Open</MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const WithButton: CaseFn = (props) => {
  return (
    <Menu {...props}>
      <MenuButton>
        <ButtonPrimary>Open</ButtonPrimary>
      </MenuButton>
      <MenuList>
        <MenuItem>Item 1</MenuItem>
        <MenuItem>Item 2</MenuItem>
        <MenuItem>Item 3</MenuItem>
      </MenuList>
    </Menu>
  );
};
