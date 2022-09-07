import { EditableLabel } from "./index";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { useArgs } from "@storybook/client-api";

const Component = EditableLabel;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
} as ComponentMeta<typeof Component>;

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
Base.storyName = Component.name;
Base.args = {
  id: "1",
  name: "Name",
};
