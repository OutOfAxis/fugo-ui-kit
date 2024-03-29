import { Meta, StoryFn } from "@storybook/react";
import { TableData, TableDataHead } from "./index";

const Component = TableData;

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

export const Base: CaseFn = () => {
  return (
    <TableData>
      <TableDataHead>
        <tr>
          <th>Column 1</th>
          <th>Column 2</th>
        </tr>
      </TableDataHead>
      <tbody>
        <tr>
          <td>Row 1, Column 1</td>
          <td>Row 1, Column 2</td>
        </tr>
        <tr>
          <td>Row 2, Column 1</td>
          <td>Row 2, Column 2</td>
        </tr>
      </tbody>
    </TableData>
  );
};
Base.name = Component.displayName!;
