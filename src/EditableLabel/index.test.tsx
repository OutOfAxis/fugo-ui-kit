import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import EditableLabel from "./index";

it("should render", () => {
  const { getByText } = render(<EditableLabel id="id" name="test" />);
  expect(getByText("test")).toBeInTheDocument();
});

it("should handle on click", () => {
  const onClick = jest.fn();
  const { getByText, getByPlaceholderText } = render(
    <EditableLabel id="id" onNameChange={onClick} name="test" />
  );

  expect(getByText("test")).toBeInTheDocument();
  expect(() => getByPlaceholderText("test")).toThrowError();

  fireEvent.click(getByText("test"));

  expect(getByPlaceholderText("test")).toBeInTheDocument();
  expect(() => getByText("test")).toThrowError();
});

it("should handle on change and set a new value", () => {
  function Container() {
    const [value, setValue] = useState("test");

    const handleOnChange = (_: string, newValue: string) => setValue(newValue);
    return <EditableLabel onNameChange={handleOnChange} name={value} id="id" />;
  }

  const { getByText, getByPlaceholderText } = render(<Container />);
  expect(getByText("test")).toBeInTheDocument();
  expect(() => getByPlaceholderText("test")).toThrowError();
  fireEvent.click(getByText("test"));
  expect(getByPlaceholderText("test")).toBeInTheDocument();
  fireEvent.input(getByPlaceholderText("test"), {
    target: { value: "after change" },
  });
  fireEvent.keyDown(getByPlaceholderText("test"), {
    key: "Enter",
    code: "Enter",
  });
  expect(getByText("after change")).toBeInTheDocument();
});

it("should not be editable", () => {
  const { getByText, getByPlaceholderText } = render(
    <EditableLabel id="id" name="test" />
  );

  expect(getByText("test")).toBeInTheDocument();
  expect(() => getByPlaceholderText("test")).toThrowError();

  fireEvent.click(getByText("test"));

  expect(getByText("test")).toBeInTheDocument();
  expect(() => getByPlaceholderText("test")).toThrowError();
});
