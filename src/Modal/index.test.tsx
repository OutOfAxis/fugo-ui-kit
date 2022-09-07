import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Modal } from "./index";
import { ButtonPrimary } from "../ButtonPrimary";

it("should toggle visibility on click", () => {
  function Container() {
    const [isOpen, setVisibility] = useState(false);

    const handleOnClick = () => setVisibility(!isOpen);
    return (
      <div>
        <ButtonPrimary onClick={handleOnClick}>Open modal</ButtonPrimary>
        <Modal isOpen={isOpen} onClose={handleOnClick}>
          Modal test
        </Modal>
      </div>
    );
  }

  const { getByText } = render(<Container />);

  expect(() => getByText("Modal test")).toThrowError();
  fireEvent.click(getByText("Open modal"));
  expect(getByText("Modal test")).toBeInTheDocument();
});
