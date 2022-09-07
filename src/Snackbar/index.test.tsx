import { useState } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Snackbar } from "./index";
import { ButtonPrimary } from "../ButtonPrimary";

it("should display on click", () => {
  function Container() {
    const [isOpen, setOpen] = useState(false);
    return (
      <>
        <ButtonPrimary onClick={() => setOpen(true)}>
          Show snackbar
        </ButtonPrimary>
        <Snackbar
          isOpen={isOpen}
          message="Snackbar is visible"
          onClose={() => setOpen(false)}
          onUndo={() => setOpen(false)}
        />
      </>
    );
  }
  const { getByText } = render(<Container />);

  expect(() => getByText("Snackbar is visible")).toThrowError();
  fireEvent.click(getByText("Show snackbar"));
  expect(getByText("Snackbar is visible")).toBeInTheDocument();
});
