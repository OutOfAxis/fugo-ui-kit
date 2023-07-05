import { ComponentProps, useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Checkbox } from "./index";

it("renders without props", () => {
  const { container } = render(<Checkbox />);
  const firstChild = container.firstChild;
  expect(firstChild).toBeInTheDocument();
});

it("clicks and updates property", () => {
  function Container() {
    const [checked, setChecked] =
      useState<ComponentProps<typeof Checkbox>["value"]>("mixed");
    return <Checkbox onChange={() => setChecked(!checked)} value={checked} />;
  }

  const { container } = render(<Container />);
  const input = container.querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;

  expect(input).toHaveAttribute("aria-checked", "mixed");
  fireEvent.click(input);
  expect(input.checked).toBe(false);
  fireEvent.click(input);
  expect(input.checked).toBe(true);
});
