import { Meta, StoryFn } from "@storybook/react";
import { Table, Row, Cell } from "./index";
import { useState } from "react";

const Component = Table;

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
  subcomponents: {
    Row,
    Cell,
  },
} as Meta<typeof Component>;

export const Base: StoryFn<any> = (props) => {
  // const [args, setArgs] = useArgs();
  const [selected, setSelected] = useState<Array<number>>(
    props.isSelectable ? [0] : [],
  );
  const handleSelect = (index: number) => {
    setSelected(
      selected.includes(index)
        ? selected.filter((x) => x !== index)
        : [index, ...selected],
    );
  };
  return (
    <Table isEditable={props.isEditable}>
      <Row
        isSelected={selected.includes(0)}
        isSelectable={props.isSelectable}
        alwaysShowSelect={props.alwaysShowSelect}
        onChange={() => {
          handleSelect(0);
        }}
      >
        <Cell>Selectable with checkbox only</Cell>
        <Cell>Cell 2</Cell>
        <Cell>Cell 3</Cell>
      </Row>
      <Row
        isSelected={selected.includes(1)}
        isSelectable={props.isSelectable}
        alwaysShowSelect={props.alwaysShowSelect}
        onChange={() => {
          handleSelect(1);
        }}
        onClick={() => {
          if (props.isSelectable) {
            handleSelect(1);
          }
        }}
      >
        <Cell>Option to click on the line to select</Cell>
        <Cell>Cell B</Cell>
        <Cell>Cell C</Cell>
      </Row>
    </Table>
  );
};
Base.name = Component.name;
Base.args = {
  isEditable: true,
  isSelectable: true,
  alwaysShowSelect: true,
};

export const Static = Base.bind({});
Static.args = {
  isEditable: false,
  isSelectable: false,
  alwaysShowSelect: false,
};
