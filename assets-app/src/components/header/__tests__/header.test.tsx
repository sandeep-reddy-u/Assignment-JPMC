import { render, screen } from "@testing-library/react";
import Header from "../header";

test("renders assets header", () => {
  render(<Header />);
  const headerElement = screen.getByText("Assets");
  expect(headerElement).toBeInTheDocument();
});
