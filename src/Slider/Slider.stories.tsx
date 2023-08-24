import { Meta, StoryFn } from "@storybook/react";
import {
  Slider,
  SliderThrottled,
  SliderSideValue,
  SliderPercentLabeled,
} from "./index";
import { useArgs } from "@storybook/preview-api";
import { SliderOrientation } from "@reach/slider";

const Component = Slider;

type CaseFn = StoryFn<typeof Component>;

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
  argTypes: {
    onChange: {
      type: "function",
    },
  },
} as Meta<typeof Component>;

export const Base: CaseFn = (props) => {
  const [args, setArgs] = useArgs();
  return (
    <Slider
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
Base.name = Component.name;
Base.args = {
  className: "w-60",
  value: 0,
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
  orientation: SliderOrientation.Horizontal,
};
Base.argTypes = {
  orientation: {
    control: {
      type: "radio",
      options: [SliderOrientation.Horizontal, SliderOrientation.Vertical],
    },
  },
};

export const SliderThrottledStory: StoryFn<typeof SliderThrottled> = (
  props,
) => {
  const [args, setArgs] = useArgs();
  return (
    <SliderThrottled
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
SliderThrottledStory.name = "SliderThrottled";
SliderThrottledStory.args = {
  throttle: 150,
  ...Base.args,
};
SliderThrottledStory.argTypes = Base.argTypes;

export const SliderSideValueStory: StoryFn<typeof SliderSideValue> = (
  props,
) => {
  const [args, setArgs] = useArgs();
  return (
    <SliderSideValue
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
SliderSideValueStory.name = "SliderSideValue";
SliderSideValueStory.args = {
  className: "w-60",
  value: 0,
  min: 0,
  max: 100,
};

export const SliderPercentLabeledStory: StoryFn<typeof SliderPercentLabeled> = (
  props,
) => {
  const [args, setArgs] = useArgs();
  return (
    <SliderPercentLabeled
      {...props}
      onChange={(value) => {
        props.onChange?.(value);
        setArgs({ ...args, value });
      }}
    />
  );
};
SliderPercentLabeledStory.name = "SliderPercentLabeled";
SliderPercentLabeledStory.args = {
  label: "Slider label",
  className: "w-60",
  value: 0,
  disabled: false,
};
