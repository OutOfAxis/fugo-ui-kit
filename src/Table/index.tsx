import {
  cloneElement,
  ChangeEvent,
  ReactElement,
  MouseEvent,
  ReactNode,
  forwardRef,
  isValidElement,
} from "react";
import { Checkbox } from "../Checkbox";
import styles from "./index.module.css";
import noop from "lodash/noop";
import flattenChildren from "react-keyed-flatten-children";

export const Table = forwardRef<
  HTMLTableElement,
  {
    isEditable?: boolean;
    children: ReactElement | Array<ReactElement | null>;
  }
>(({ isEditable, children }, ref) => (
  <table
    ref={ref}
    className={`w-full table-fixed border-separate ${styles.table}`}
  >
    <tbody>
      {flattenChildren(children).map((child) => {
        if (isValidElement<any>(child)) {
          return cloneElement(child, {
            ...child.props,
            isSelectable:
              child.props.isSelectable != null
                ? child.props.isSelectable && isEditable
                : isEditable,
          });
        }
        return child;
      })}
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
          className={`w-3 rounded-l-lg border-b border-l border-t md:w-4 ${backgroundColor} ${borderColorValue}`}
        />
        {flattenChildren(children).map((child) => {
          if (isValidElement<any>(child)) {
            return cloneElement(child, {
              ...child.props,
              borderColor: borderColorValue,
              backgroundColor,
            });
          }
          return child;
        })}
        <td
          className={`w-4 rounded-r-lg border-b border-r border-t ${backgroundColor} ${borderColorValue}`}
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
      className={`border-b border-t ${backgroundColor} ${borderColor} ${className}`}
    >
      {children}
    </td>
  )
);
Cell.displayName = "Cell";
