import { render } from "@testing-library/react";
import { Breadcrumbs } from "./index";

it("renders component properly", () => {
  const { getAllByText, getByText } = render(
    <Breadcrumbs>
      <a href="/test 1">Test Link 1</a>
      <a href="/test2">Test Link 2</a>
      <span>Test label</span>
    </Breadcrumbs>
  );

  expect(getByText("Test Link 1")).toBeInTheDocument();
  expect(getByText("Test Link 2")).toBeInTheDocument();
  expect(getByText("Test label")).toBeInTheDocument();
  expect(getAllByText((text) => text.includes("/"))).toHaveLength(2);
});
