import { styled } from "../styled";

export const TableKeyValue = styled(
  "table"
)`border-separate border-spacing-y-3 text-xl`;
TableKeyValue.displayName = "TableKeyValue";

export const ResponsiveTableRow = styled("tr")`flex flex-col sm:table-row`;
ResponsiveTableRow.displayName = "ResponsiveTableRow";

export const TableLabelCell = styled("td")`text-gray-600`;
TableLabelCell.displayName = "TableLabelCell";
