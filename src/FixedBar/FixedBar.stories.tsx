import { FixedBar } from "./index";
import { Meta, StoryFn } from "@storybook/react";

const Component = FixedBar;

type CaseFn = StoryFn<typeof Component>;

export default {
  component: Component,
  parameters: {
    docs: {
      inlineStories: false,
      iframeHeight: 100,
      description: {
        component: `Reserves space in the document flow, and add a position "fixed" bar on top`,
      },
    },
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  return (
    <div>
      <FixedBar {...props}>
        <div className="border border-black bg-white p-4">Top bar</div>
      </FixedBar>
      <div className="w-4">
        Lot of text here to make the height of the bar grow
      </div>
    </div>
  );
};
Base.name = Component.name;
