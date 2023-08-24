import { Meta, StoryFn } from "@storybook/react";
import { Toggle } from "./index";
import { useArgs } from "@storybook/preview-api";

const Component = Toggle;

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
  const [args, setArgs] = useArgs();
  return (
    <Toggle
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.name = Component.displayName!;
Base.args = {
  label: "Toggle label",
};
