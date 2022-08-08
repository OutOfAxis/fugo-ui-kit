import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Textarea } from "./Textarea";
import { useArgs } from "@storybook/client-api";

const Component = Textarea;

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
    <Textarea
      {...props}
      className="w-full"
      onChange={(e) => {
        props.onChange?.(e);
        setArgs({ ...args, value: e.currentTarget.value });
      }}
    />
  );
};
Base.storyName = Component.name;
Base.args = {};
