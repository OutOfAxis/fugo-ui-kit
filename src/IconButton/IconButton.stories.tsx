import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { IconButton } from "./index";
import { ReactComponent as PremiumIcon } from "../Icons/PremiumIcon.svg";

const Component = IconButton;

type CaseFn = ComponentStoryFn<typeof Component>;

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

export const Base: CaseFn = (props) => {
  return <IconButton {...props} />;
};
Base.storyName = Component.displayName;
Base.args = {
  children: <PremiumIcon className="w-5 h-5" />,
};
