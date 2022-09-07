import { render, fireEvent } from "@testing-library/react";
import { ButtonPrimary } from "./index";

it("renders without props", () => {
  const { getByText } = render(<ButtonPrimary>call to action</ButtonPrimary>);
  expect(getByText("call to action")).toBeInTheDocument();
});

it("clicks", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ButtonPrimary onClick={onClick}>call to action</ButtonPrimary>
  );
  expect(getByText("call to action")).toBeInTheDocument();
  fireEvent.click(getByText("call to action"));
  expect(onClick).toBeCalled();
});
