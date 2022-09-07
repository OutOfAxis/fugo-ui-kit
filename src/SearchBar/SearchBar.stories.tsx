import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { SearchBar } from "./index";
import { useArgs } from "@storybook/client-api";

const Component = SearchBar;

type CaseFn = ComponentStoryFn<typeof Component>;

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
  argTypes: {},
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <SearchBar
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.args = {
  value: "",
  autoFocus: true,
};

export const MobileFoldable: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <SearchBar
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
MobileFoldable.args = {
  value: "",
  autoFocus: true,
  foldable: true,
};
MobileFoldable.parameters = {
  viewport: {
    defaultViewport: "mobile1",
  },
};
