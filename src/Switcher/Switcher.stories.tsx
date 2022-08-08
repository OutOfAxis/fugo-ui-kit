import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import Switcher from "./index";
import { useArgs } from "@storybook/client-api";

const Component = Switcher;

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
    <Switcher
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.storyName = Component.name;
Base.args = {
  value: "a",
  options: [
    {
      value: "a",
      label: "Option A",
    },
    {
      value: "b",
      label: "Option B",
    },
    {
      value: "c",
      label: "Option C",
    },
  ],
};
