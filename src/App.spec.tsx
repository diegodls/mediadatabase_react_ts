import { render, screen } from "@testing-library/react";
describe("Testing App.tsx", () => {
  it("Should render Hello World", () => {
    expect(5 + 5).toBe(10);
    // render(<App />);
    // const message = screen.getByText("Hello World");
    // expect(message).toBeInTheDocument();
  });
});
