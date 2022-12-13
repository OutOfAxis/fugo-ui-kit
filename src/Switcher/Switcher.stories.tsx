import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Switcher, SwitcherOption } from "./index";
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
      value={args.value}
      onValueChange={(value) => {
        props.onValueChange?.(value);
        setArgs({ ...args, value });
      }}
    >
      <SwitcherOption value="1">Option 1</SwitcherOption>
      <SwitcherOption value="2">Option 2</SwitcherOption>
    </Switcher>
  );
};
Base.storyName = Component.name;
