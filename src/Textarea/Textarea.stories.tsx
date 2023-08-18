import { Meta, StoryFn } from "@storybook/react";
import { Textarea } from "./Textarea";
import { useArgs } from "@storybook/preview-api";

const Component = Textarea;

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
