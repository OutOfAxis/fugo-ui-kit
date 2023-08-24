import { EditableLabel } from "./index";
import { Meta, StoryFn } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";

const Component = EditableLabel;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <EditableLabel
      {...props}
      onNameChange={(id, name) => {
        props.onNameChange?.(id, name);
        setArgs({ ...args, name });
      }}
    />
  );
};
Base.name = Component.name;
Base.args = {
  id: "1",
  name: "Name",
};
