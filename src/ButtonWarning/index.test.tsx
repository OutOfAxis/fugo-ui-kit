import { render, fireEvent } from "@testing-library/react";
import { ButtonWarning } from "./index";

it("renders without props", () => {
  const { getByText } = render(<ButtonWarning>call to action</ButtonWarning>);
  expect(getByText("call to action")).toBeInTheDocument();
});

it("clicks", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ButtonWarning onClick={onClick}>call to action</ButtonWarning>
  );
  expect(getByText("call to action")).toBeInTheDocument();
  fireEvent.click(getByText("call to action"));
  expect(onClick).toBeCalled();
});
