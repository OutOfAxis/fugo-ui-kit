import { SquareCheckbox } from "./SquareCheckbox";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const Component = SquareCheckbox;

type Case = StoryObj<typeof Component>;

export default {
  title: "SquareCheckbox",
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
    <SquareCheckbox
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
