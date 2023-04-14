import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { Tab, TabsSide } from "./TabsSide";
import { useArgs } from "@storybook/client-api";
import { PremiumIconSvg } from "../Icons/PremiumIcon";

const Component = TabsSide;

type CaseFn = ComponentStoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 400,
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
    <TabsSide
      {...props}
      onChange={(newTab) => {
        props.onChange?.(newTab);
        setArgs({ ...args, activeTabId: newTab });
      }}
    >
      <Tab
        id="tab1"
        label="Tab 1"
        icon={<PremiumIconSvg className="h-6 w-6" />}
        className="p-4"
      >
        Tab content 1
      </Tab>
      <Tab
        id="tab2"
        label="Tab 2"
        icon={<PremiumIconSvg className="h-6 w-6" />}
        className="p-4"
      >
        Content for tab 2
      </Tab>
    </TabsSide>
  );
};
Base.storyName = Component.name;
Base.args = {
  activeTabId: "tab1",
};
