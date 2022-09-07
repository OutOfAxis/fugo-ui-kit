import { render, fireEvent } from "@testing-library/react";
import { SearchBar } from "./index";

it("renders", () => {
  const { getByPlaceholderText, getByDisplayValue } = render(
    <SearchBar
      placeholder="test placeholder"
      value="test value"
      onChange={jest.fn()}
    />
  );
  expect(getByPlaceholderText("test placeholder")).toBeInTheDocument();
  expect(getByDisplayValue("test value")).toBeInTheDocument();
});

it("handles a change", () => {
  const onChange = jest.fn();
  const { getByDisplayValue } = render(
    <SearchBar onChange={onChange} value="test value" />
  );
  const component = getByDisplayValue("test value");
  fireEvent.change(component, { target: { value: "newValue" } });
  expect(onChange).toBeCalled();
});
