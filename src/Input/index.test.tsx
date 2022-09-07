import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "./index";

it("should render without props", () => {
  const { getByDisplayValue } = render(<Input value="test" />);
  expect(getByDisplayValue("test")).toBeInTheDocument();
});

it("should handle on change", () => {
  function Container() {
    const [value, setValue] = useState("test 1");

    const handleOnChange = (newValue: string) => setValue(newValue);
    return <Input onValueChange={handleOnChange} value={value} />;
  }

  const { getByDisplayValue } = render(<Container />);

  expect(getByDisplayValue("test 1")).toBeInTheDocument();
  fireEvent.input(getByDisplayValue("test 1"), { target: { value: "test 2" } });
  expect(getByDisplayValue("test 2")).toBeInTheDocument();
});
