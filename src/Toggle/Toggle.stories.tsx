import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Toggle } from "./index";
import { useArgs } from "@storybook/client-api";

const Component = Toggle;

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
Base.storyName = Component.displayName;
Base.args = {
  label: "Toggle label",
};
