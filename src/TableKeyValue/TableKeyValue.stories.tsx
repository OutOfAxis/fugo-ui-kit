import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import { TableKeyValue, ResponsiveTableRow, TableLabelCell } from "./index";

const Component = TableKeyValue;

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

export const Base: CaseFn = () => {
  return (
    <TableKeyValue>
      <ResponsiveTableRow>
        <TableLabelCell>Label</TableLabelCell>
        <td>Value</td>
      </ResponsiveTableRow>
      <ResponsiveTableRow>
        <TableLabelCell>Label</TableLabelCell>
        <td>Value</td>
      </ResponsiveTableRow>
    </TableKeyValue>
  );
};
Base.storyName = Component.displayName;
