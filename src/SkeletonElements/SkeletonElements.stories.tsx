import { StoryFn, Meta } from "@storybook/react";
import { ButtonPlaceholder, TextPlaceholder } from "./index";

export default {
  title: "SkeletonElements",
  parameters: {
    docs: {
      description: {
        component: ``,
      },
    },
  },
} as Meta;

export const ButtonPlaceholderStory: StoryFn<typeof ButtonPlaceholder> = (
  props,
) => {
  return <ButtonPlaceholder {...props} />;
};
ButtonPlaceholderStory.name = "ButtonPlaceholder";
ButtonPlaceholderStory.args = {
  style: { width: 100 },
};

export const TextPlaceholderStory: StoryFn<typeof TextPlaceholder> = (
  props,
) => {
  return (
    <div className="space-y-4">
      <TextPlaceholder {...props} />
      <TextPlaceholder {...props} />
      <TextPlaceholder {...props} />
    </div>
  );
};
TextPlaceholderStory.name = "TextPlaceholder";
TextPlaceholderStory.args = {
  min: 40,
  max: 120,
};
