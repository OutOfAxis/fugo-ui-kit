import { render } from "@testing-library/react";
import { EditableTitle } from "./index";

it("renders component properly", () => {
  const { getByDisplayValue } = render(
    <EditableTitle value="Foo" onChange={jest.fn()} />
  );
  expect(getByDisplayValue("Foo")).toBeInTheDocument();
});
