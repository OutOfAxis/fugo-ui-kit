import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Confirm } from "./index";
import { ButtonPrimary } from "../../ButtonPrimary";
import { ButtonSecondary } from "../../ButtonSecondary";

it("should toggle visibility on click", () => {
  function Container() {
    const [isOpen, setVisibility] = useState(false);

    const handleOnClick = () => setVisibility(!isOpen);
    return (
      <div>
        <ButtonPrimary onClick={handleOnClick}>
          Open confirm modal
        </ButtonPrimary>
        <Confirm
          isOpen={isOpen}
          onCancel={handleOnClick}
          onConfirm={handleOnClick}
          confirmTitle="Confirm"
          title="Title"
        >
          Confirm Modal test
          <ButtonSecondary onClick={handleOnClick}>Close</ButtonSecondary>
        </Confirm>
      </div>
    );
  }

  const { getByText } = render(<Container />);

  expect(() => getByText("Confirm Modal test")).toThrowError();
  fireEvent.click(getByText("Open confirm modal"));
  expect(getByText("Confirm Modal test")).toBeInTheDocument();
  fireEvent.click(getByText("Close"));
});
