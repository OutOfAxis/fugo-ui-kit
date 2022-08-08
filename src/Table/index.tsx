import React, { ChangeEvent, ReactElement, MouseEvent, ReactNode } from "react";
import Checkbox from "../Checkbox";
import styles from "./index.module.css";
import noop from "lodash/noop";

function Table({
  isEditable,
  children,
}: {
  isEditable?: boolean;
  children: ReactElement | Array<ReactElement | null>;
}) {
  return (
    <table className={`border-separate table-fixed w-full ${styles.table}`}>
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
  );
}

function Row({
  isSelectable,
  alwaysShowSelect = false,
  isSelected,
  onChange = noop,
  onClick,
  children,
}: {
  isSelectable?: boolean;
  alwaysShowSelect?: boolean;
  isSelected: boolean;
  onChange?: (event: ChangeEvent) => void;
  onClick?: (event: MouseEvent) => void;
  children: Array<ReactElement | null>;
}) {
  const borderColor = isSelected
    ? "border-blue-400"
    : isSelectable
    ? styles.selectable
    : "border-gray-200";

  return (
    <tr
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
        className={`w-3 md:w-4 rounded-l-lg border-l border-t border-b bg-white ${borderColor}`}
      />
      {React.Children.map(
        children,
        (child) =>
          child &&
          React.cloneElement(child, {
            ...child.props,
            borderColor,
          })
      )}
      <td
        className={`w-4 rounded-r-lg border-t border-b border-r bg-white ${borderColor}`}
      />
    </tr>
  );
}

function Cell({
  className = "",
  borderColor = "",
  children = null,
}: {
  className?: string;
  borderColor?: string;
  children?: ReactNode;
}) {
  return (
    <td className={`border-t border-b bg-white ${borderColor} ${className}`}>
      {children}
    </td>
  );
}

export { Table, Row, Cell };
