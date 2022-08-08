import { useState } from "react";
import { fireEvent, render } from "@testing-library/react";
import Tabs, { Tab } from "./index";

it("should render component", () => {
  const { getByText } = render(
    <Tabs>
      <Tab label="test" id="test">
        Test content
      </Tab>
    </Tabs>
  );
  expect(getByText("test")).toBeInTheDocument();
});

it("should handle on click", () => {
  function Container() {
    const [activeId, setActive] = useState("tab_01");
    const handleOnClick = (newValue: string) => setActive(newValue);

    return (
      <Tabs activeTabId={activeId} onChange={handleOnClick}>
        <Tab id="tab_01" label="First">
          <div>Child 1 Test</div>
        </Tab>
        <Tab id="tab_02" label="Second">
          <div>Child 2 Test</div>
        </Tab>
        <Tab id="tab_03" label="Third">
          <div>Child 3 Test</div>
        </Tab>
      </Tabs>
    );
  }

  const { getByText } = render(<Container />);

  expect(getByText("Child 1 Test")).toBeInTheDocument();

  expect(getByText("Second")).toBeInTheDocument();
  fireEvent.click(getByText("Second"));
  expect(getByText("Child 2 Test")).toBeInTheDocument();

  expect(getByText("Third")).toBeInTheDocument();
  fireEvent.click(getByText("Third"));
  expect(getByText("Child 3 Test")).toBeInTheDocument();
});
