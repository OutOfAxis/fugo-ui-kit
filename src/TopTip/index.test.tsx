import { render } from "@testing-library/react";
import TopTip from "./index";

it("renders component with proper text", () => {
  const { getByText } = render(<TopTip>Test</TopTip>);
  expect(getByText("Test")).toBeInTheDocument();
});
