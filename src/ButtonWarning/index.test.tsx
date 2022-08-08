import { render, fireEvent } from "@testing-library/react";
import Button from "./index";

it("renders without props", () => {
  const { getByText } = render(<Button>call to action</Button>);
  expect(getByText("call to action")).toBeInTheDocument();
});

it("clicks", () => {
  const onClick = jest.fn();
  const { getByText } = render(
    <Button onClick={onClick}>call to action</Button>
  );
  expect(getByText("call to action")).toBeInTheDocument();
  fireEvent.click(getByText("call to action"));
  expect(onClick).toBeCalled();
});
