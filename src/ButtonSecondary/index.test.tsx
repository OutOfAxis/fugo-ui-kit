import { render, fireEvent } from "@testing-library/react";
import { ButtonSecondary } from "./index";

it("renders without props", () => {
  const { getByText } = render(
    <ButtonSecondary>call to action</ButtonSecondary>
  );
  expect(getByText("call to action")).toBeInTheDocument();
});

it("clicks", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ButtonSecondary onClick={onClick}>call to action</ButtonSecondary>
  );
  expect(getByText("call to action")).toBeInTheDocument();
  fireEvent.click(getByText("call to action"));
  expect(onClick).toBeCalled();
});
