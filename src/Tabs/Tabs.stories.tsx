import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import Tabs, { Tab } from "./index";
import { useArgs } from "@storybook/client-api";

const Component = Tabs;

type CaseFn = ComponentStoryFn<typeof Component>;

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
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Tabs
      {...props}
      onChange={(newTab) => {
        props.onChange?.(newTab);
        setArgs({ ...args, activeTabId: newTab });
      }}
    >
      <Tab id="tab1" label="Tab 1" icon={<span>1</span>} className="p-4">
        Tab content 1
      </Tab>
      <Tab id="tab2" label="Tab 2" icon={<span>2</span>} className="p-4">
        Content for tab 2
      </Tab>
    </Tabs>
  );
};
Base.storyName = Component.name;
Base.args = {
  activeTabId: "tab1",
};
