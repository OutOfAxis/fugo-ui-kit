import { Meta, StoryFn } from "@storybook/react";
import { NumberInputBase, NumberInput } from "./index";
import { useArgs } from "@storybook/preview-api";

const Component = NumberInputBase;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
    docs: {
      description: {
        component: ``,
      },
    },
  },
  args: {},
  argTypes: {
    min: { control: { type: "number" } },
    max: { control: { type: "number" } },
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <NumberInputBase
      {...props}
      onValueChange={(value) => {
        props.onValueChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.name = "InputNumberBase";

export const Styled: StoryFn<typeof NumberInput> = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <NumberInput
      {...props}
      onValueChange={(value) => {
        props.onValueChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
