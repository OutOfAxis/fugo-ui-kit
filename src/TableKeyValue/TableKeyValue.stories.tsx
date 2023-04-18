import { ComponentMeta, ComponentStoryFn } from "@storybook/react";
import {
  TableKeyValue,
  ResponsiveTableRow,
  TableLabelCell,
  ResponsiveTableBody,
} from "./index";

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
      <ResponsiveTableBody>
        <ResponsiveTableRow>
          <TableLabelCell>Label</TableLabelCell>
          <td>Value</td>
        </ResponsiveTableRow>
        <ResponsiveTableRow>
          <TableLabelCell>Label</TableLabelCell>
          <td>Value</td>
        </ResponsiveTableRow>
      </ResponsiveTableBody>
    </TableKeyValue>
  );
};
Base.storyName = Component.displayName;
