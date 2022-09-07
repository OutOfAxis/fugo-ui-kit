import { render, fireEvent } from "@testing-library/react";
import { Switcher } from "./index";

it("renders and switches", () => {
  const onChange = jest.fn();
  const { getByText } = render(
    <Switcher
      value="admin"
      onChange={onChange}
      options={[
        { label: "Admin", value: "admin" },
        { label: "Member", value: "member" },
      ]}
    />
  );
  expect(getByText("Admin")).toBeInTheDocument();
  fireEvent.click(getByText("Member"));
  expect(onChange).toBeCalledWith("member");
});
