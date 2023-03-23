import { render, fireEvent } from "@testing-library/react";
import { ButtonPrimaryAlt } from "./index";

it("renders without props", () => {
  const { getByText } = render(
    <ButtonPrimaryAlt>call to action</ButtonPrimaryAlt>
  );
  expect(getByText("call to action")).toBeInTheDocument();
});

it("clicks", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <ButtonPrimaryAlt onClick={onClick}>call to action</ButtonPrimaryAlt>
  );
  expect(getByText("call to action")).toBeInTheDocument();
  fireEvent.click(getByText("call to action"));
  expect(onClick).toBeCalled();
});
