import { Combobox, ComboboxList, Option } from "./";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

const Component = Combobox;

export default {
  component: Component,
  parameters: {
    viewMode: "story",
  },
  argTypes: {
    onChange: {
      type: "function",
    },
    onSelect: {
      type: "function",
    },
    placeholder: {
      type: "string",
      defaultValue: "Select an option",
    },
  },
} as ComponentMeta<typeof Component>;

export const Base: ComponentStoryFn<typeof Component> = (props) => {
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
Base.storyName = "Combobox";
