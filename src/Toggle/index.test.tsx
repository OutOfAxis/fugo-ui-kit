import { render, fireEvent } from "@testing-library/react";
import { Toggle } from "./index";

it("renders without props", () => {
  const { getByText, container } = render(
    <Toggle label="toggle me" onChange={jest.fn()} />
  );
  expect(container.firstChild).toBeInTheDocument();
  expect(getByText("toggle me")).toBeInTheDocument();
});

it("toggles", () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <Toggle value={false} onChange={onChange}></Toggle>
  );
  fireEvent.click(getByTestId("toggler"));
  expect(onChange).toBeCalledWith(true);
});
