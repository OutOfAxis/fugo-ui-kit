import { Meta, StoryFn } from "@storybook/react";
import { IconButton } from "./index";
import { ReactComponent as PremiumIcon } from "../Icons/PremiumIcon.svg";

const Component = IconButton;

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
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  return <IconButton {...props} />;
};
Base.storyName = Component.displayName;
Base.args = {
  children: <PremiumIcon className="h-5 w-5" />,
};
