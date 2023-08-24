import { FixedSideBar } from "./FixedSideBar";
import { Meta, StoryFn } from "@storybook/react";

const Component = FixedSideBar;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: {
      inlineStories: false,
      iframeHeight: 100,
      description: {
        component: `Reserves space in the document flow, and add a position "fixed" panel on left`,
      },
    },
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <div className="flex">
      <FixedSideBar {...props}>
        <div className="h-full border border-black bg-white p-4">
          Side panel
        </div>
      </FixedSideBar>
      <div className="w-4">
        Lot of text here to make the height of the bar grow
      </div>
    </div>
  );
};
Base.name = Component.name;
