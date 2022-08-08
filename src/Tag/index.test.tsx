import { render } from "@testing-library/react";
import Tag from "./index";

it("should render without props (default)", () => {
  const { getByText } = render(<Tag>Default</Tag>);
  const element = getByText("Default");

  expect(element).toBeInTheDocument();
});
