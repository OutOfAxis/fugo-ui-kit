import { Checkbox } from "./";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const Component = Checkbox;

type Case = StoryObj<typeof Component>;

export default {
  component: Component,
  argTypes: {
    value: {
      control: {
        type: "radio",
        options: [true, false, "mixed"],
      },
    },
  },
} as Meta<typeof Component>;

export const Base: StoryFn<typeof Component> = () => {
  const [args, setArgs] = useArgs();
  return (
    <Checkbox
      value={args.value}
      onChange={(e) => {
        args.onChange(e);
        setArgs({ value: e.target.checked });
      }}
    />
  );
};

export const Checked: Case = {
  args: {
    value: true,
  },
};

export const Mixed: Case = {
  args: {
    value: "mixed",
  },
};
