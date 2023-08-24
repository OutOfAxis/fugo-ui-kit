import { Meta, StoryFn } from "@storybook/react";
import { Radio, RadioGroup } from "./Radio";
import { useArgs } from "@storybook/preview-api";

const Component = RadioGroup;

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
    <RadioGroup
      {...props}
      onChange={(e, value) => {
        props.onChange?.(e, value);
        setArgs({ ...args, value });
      }}
    >
      <label>
        <Radio value="a" />
        Option A
      </label>
      <label>
        <Radio value="b" />
        Option B
      </label>
    </RadioGroup>
  );
};
Base.name = "Radio";
Base.args = {
  value: "a",
};
