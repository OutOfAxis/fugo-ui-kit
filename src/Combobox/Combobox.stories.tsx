import { Combobox, ComboboxList, Option } from "./";
import { Meta, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const Component = Combobox;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
  },
  args: {
    placeholder: "Select an option",
  },
  argTypes: {
    onChange: {
      type: "function",
    },
    onSelect: {
      type: "function",
    },
  },
} as Meta<typeof Component>;

export const Base: StoryFn<typeof Component> = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Component
      {...props}
      onChange={(newValue) => {
        setArgs({ ...args, value: newValue });
        args.onChange(newValue);
      }}
      onSelect={(newValue) => {
        setArgs({ ...args, value: newValue });
        args.onSelect(newValue);
      }}
    >
      <ComboboxList>
        <Option value="Option 1">Option 1</Option>
        <Option value="Another option 2">Another option 2</Option>
        <Option value="And the last option 3">And the last option 3</Option>
      </ComboboxList>
    </Component>
  );
};
Base.name = "Combobox";
