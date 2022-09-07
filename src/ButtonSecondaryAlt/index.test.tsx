import { render, fireEvent } from "@testing-library/react";
import { ButtonSecondaryAlt } from "./index";

it("renders without props", () => {
  const { getByText } = render(
    <ButtonSecondaryAlt>call to action</ButtonSecondaryAlt>
  );
  expect(getByText("call to action")).toBeInTheDocument();
});

it("clicks", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ButtonSecondaryAlt onClick={onClick}>call to action</ButtonSecondaryAlt>
  );
  expect(getByText("call to action")).toBeInTheDocument();
  fireEvent.click(getByText("call to action"));
  expect(onClick).toBeCalled();
});
