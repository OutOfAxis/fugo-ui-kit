import { Meta, StoryFn } from "@storybook/react";
import { Select, SelectList, Option } from "./index";
import { useArgs } from "@storybook/preview-api";

const Component = Select;

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
    <Select
      {...props}
      onChange={(value) => {
        setArgs({ ...args, value });
      }}
    >
      <SelectList>
        <Option value="a">Option A</Option>
        <Option value="b">Option B</Option>
        <Option value="c">Option C</Option>
      </SelectList>
    </Select>
  );
};
Base.args = {
  value: "a",
};

export const DisabledWithLabelAndLoading: CaseFn = Base.bind({});
DisabledWithLabelAndLoading.args = {
  value: "a",
  label: "Select label",
  isLoading: true,
  disabled: true,
};
