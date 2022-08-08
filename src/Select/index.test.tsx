import { render } from "@testing-library/react";
import { Select, Option, SelectList } from "./index";

it("should render with proper selected value", () => {
  const handleOnClick = jest.fn();
  const { getByRole } = render(
    <Select onChange={handleOnClick} value="01">
      <SelectList>
        <Option value="01">Test 1</Option>
        <Option value="02">Test 2</Option>
        <Option value="03">Test 3</Option>
      </SelectList>
    </Select>
  );

  expect(getByRole("combobox")).toBeInTheDocument();
  expect(getByRole("combobox")).toHaveTextContent("Test 1");
});
