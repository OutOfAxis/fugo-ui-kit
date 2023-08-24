import { Disclosure, DisclosureButton, DisclosurePanel } from "./index";
import { Meta, StoryObj } from "@storybook/react";

const Component = Disclosure;

type Case = StoryObj<typeof Component>;

export default {
  component: Component,
  subcomponents: {
    DisclosureButton,
    DisclosurePanel,
  },
  parameters: {
    docs: {
      description: {
        component: `[Original component](https://reach.tech/disclosure/). Generic disclosure component. Can be used to show/hide any content. Content can be placed anywhere relative to the toggle button.`,
      },
    },
  },
} as Meta<typeof Component>;

export const Base: Case = {
  name: "Disclosure",
  args: {
    children: (
      <div>
        <DisclosureButton label="Toggle" />
        <DisclosurePanel>Content of the disclosure</DisclosurePanel>
      </div>
    ),
  },
};
