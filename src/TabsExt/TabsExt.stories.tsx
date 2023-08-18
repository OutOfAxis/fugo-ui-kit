import { Meta, StoryFn } from "@storybook/react";
import { Tabs, Tab, TabPanels, TabPanel, TabList } from "./index";
import { useArgs } from "@storybook/preview-api";

const Component = Tabs;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    docs: {
      description: {
        component: `[Original component](https://reach.tech/tabs). Same API, but with slightly adjusted styling.`,
      },
    },
  },
  args: {},
  argTypes: {},
  subcomponents: {
    Tab,
    TabPanels,
    TabPanel,
    TabList,
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Tabs
      {...props}
      onChange={(newTab) => {
        props.onChange?.(newTab);
        setArgs({ ...args, index: newTab });
      }}
    >
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>Content for tab 1</TabPanel>
        <TabPanel>Tab 2 content</TabPanel>
      </TabPanels>
    </Tabs>
  );
};
Base.parameters = {
  docs: {
    source: {
      language: "jsx",
      type: "code",
    },
  },
};
Base.storyName = "TabsExt";
Base.args = {
  index: 0,
};
