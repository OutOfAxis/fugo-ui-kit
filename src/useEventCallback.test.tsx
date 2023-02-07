import { render } from "@testing-library/react";
import { useEventCallback } from "./useEventCallback";

describe("useEventCallback", () => {
  it("should return a function that executes the function passed in args", function () {
    const Component = () => {
      const fn = () => {
        return "test";
      };
      const callback = useEventCallback(fn);
      return <>{callback()}</>;
    };
    const { getByText } = render(<Component />);
    expect(getByText("test")).toBeInTheDocument();
  });
  it("should return the same function on each render but execute the most recent", function () {
    const functions: Array<Function> = [];
    const Component = ({ fn }: { fn: any }) => {
      const callback = useEventCallback(fn);
      functions.push(callback);
      return <div data-testid="clickable" onClick={callback} />;
    };
    const callbackA = jest.fn();
    const { rerender, getByTestId } = render(<Component fn={callbackA} />);
    getByTestId("clickable").click();
    expect(callbackA.mock.calls.length).toBe(1);
    const callbackB = jest.fn();
    rerender(<Component fn={callbackB} />);
    getByTestId("clickable").click();
    expect(callbackA.mock.calls.length).toBe(1);
    expect(callbackB.mock.calls.length).toBe(1);
    expect(functions.length).toBe(2);
    expect(functions[0]).toBe(functions[1]);
  });
  it("should return a function that does nothing if undefined is passed", function () {
    const Component = () => {
      const callback = useEventCallback(undefined);
      return <>{String(callback())}</>;
    };
    const { getByText } = render(<Component />);
    expect(getByText("undefined")).toBeInTheDocument();
  });
});
