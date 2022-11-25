import React, {
  ChangeEvent,
  ReactElement,
  MouseEvent,
  ReactNode,
  forwardRef,
} from "react";
import { Checkbox } from "../Checkbox";
import styles from "./index.module.css";
import noop from "lodash/noop";

export const Table = forwardRef<
  HTMLTableElement,
  {
    isEditable?: boolean;
    children: ReactElement | Array<ReactElement | null>;
  }
>(({ isEditable, children }, ref) => (
  <table
    ref={ref}
    className={`border-separate table-fixed w-full ${styles.table}`}
  >
    <tbody>
      {React.Children.map(
        children,
        (child: ReactElement | null) =>
          child &&
          React.cloneElement(child, {
            ...child.props,
            isSelectable:
              child.props.isSelectable != null
                ? child.props.isSelectable && isEditable
                : isEditable,
          })
      )}
    </tbody>
  </table>
));
Table.displayName = "Table";

export const Row = forwardRef<
  HTMLTableRowElement,
  {
    borderColor?: string;
    backgroundColor?: string;
    isSelectable?: boolean;
    alwaysShowSelect?: boolean;
    isSelected: boolean;
    onChange?: (event: ChangeEvent) => void;
    onClick?: (event: MouseEvent) => void;
    children: Array<ReactElement | null>;
  }
>(
  (
    {
      borderColor,
      backgroundColor = "bg-white",
      isSelectable,
      alwaysShowSelect = false,
      isSelected,
      onChange = noop,
      onClick,
      children,
    },
    ref
  ) => {
    const borderColorValue =
      borderColor ||
      (isSelected
        ? "border-blue-400"
        : isSelectable
        ? styles.selectable
        : "border-gray-200");

    return (
      <tr
        ref={ref}
        className={`${styles.row} ${
          alwaysShowSelect ? styles.alwaysShowSelect : ""
        }`}
        onClick={onClick}
      >
        {isSelectable ? (
          <td className={`w-8 ${styles.select}`}>
            <Checkbox value={isSelected} onChange={onChange} />
          </td>
        ) : (
          <td className="w-8" />
        )}
        <td
          className={`w-3 md:w-4 rounded-l-lg border-l border-t border-b ${backgroundColor} ${borderColorValue}`}
        />
        {React.Children.map(
          children,
          (child) =>
            child &&
            React.cloneElement(child, {
              ...child.props,
              borderColor: borderColorValue,
              backgroundColor,
            })
        )}
        <td
          className={`w-4 rounded-r-lg border-t border-b border-r ${backgroundColor} ${borderColorValue}`}
        />
      </tr>
    );
  }
);
Row.displayName = "Row";

export const Cell = forwardRef<
  HTMLTableCellElement,
  {
    className?: string;
    borderColor?: string;
    backgroundColor?: string;
    children?: ReactNode;
  }
>(
  (
    {
      className = "",
      borderColor = "",
      backgroundColor = "bg-white",
      children = null,
    },
    ref
  ) => (
    <td
      ref={ref}
      className={`border-t border-b ${backgroundColor} ${borderColor} ${className}`}
    >
      {children}
    </td>
  )
);
Cell.displayName = "Cell";
