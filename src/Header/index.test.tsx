import { render } from "@testing-library/react";
import Header from "./index";

it("renders component with proper label", () => {
  const { getByText } = render(<Header>Test</Header>);
  expect(getByText("Test")).toBeInTheDocument();
});
