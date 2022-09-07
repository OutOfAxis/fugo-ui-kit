import { render } from "@testing-library/react";
import { RoundedCard } from "./index";

it("renders without props", () => {
  const { getByText } = render(
    <RoundedCard>
      <div>test</div>
    </RoundedCard>
  );
  expect(getByText("test")).toBeInTheDocument();
});
