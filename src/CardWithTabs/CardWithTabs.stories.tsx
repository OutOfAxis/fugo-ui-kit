import { Meta, StoryFn } from "@storybook/react";
import {
  CardWithTabs,
  CardTabList,
  CardTab,
  TabPanels,
  TabPanel,
} from "./index";

const Component = CardWithTabs;

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
  return (
    <CardWithTabs {...props}>
      <CardTabList>
        <CardTab>Tab 1</CardTab>
        <CardTab>Tab 2</CardTab>
      </CardTabList>
      <TabPanels>
        <TabPanel>Tab 1 Content</TabPanel>
        <TabPanel>Tab 2 Content</TabPanel>
      </TabPanels>
    </CardWithTabs>
  );
};
Base.name = Component.displayName!;
