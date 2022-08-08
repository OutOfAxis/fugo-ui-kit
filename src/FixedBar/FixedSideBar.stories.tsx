import { FixedSideBar } from "./FixedSideBar";
import { ComponentMeta, ComponentStoryFn } from "@storybook/react";

const Component = FixedSideBar;

type CaseFn = ComponentStoryFn<typeof Component>;

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
} as ComponentMeta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <div className="flex">
      <FixedSideBar {...props}>
        <div className="p-4 bg-white border border-black h-full">
          Side panel
        </div>
      </FixedSideBar>
      <div className="w-4">
        Lot of text here to make the height of the bar grow
      </div>
    </div>
  );
};
Base.storyName = Component.name;
