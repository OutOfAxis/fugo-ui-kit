import { Meta, StoryFn } from "@storybook/react";
import { IconTooltip } from "./index";

const Component = IconTooltip;

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
  return <IconTooltip {...props} />;
};
Base.storyName = Component.displayName;
Base.args = {
  label: "Tooltip content",
};
