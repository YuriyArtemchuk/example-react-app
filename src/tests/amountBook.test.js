import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputAmount from "../components/specificBook/InputAmount";

describe("Test123 of increasing and decreasing book quantity", () => {
  test("Increasing amount of book after click on the increasing button", () => {
    render(<InputAmount book={{ price: 10, amount: 1 }} />);

    const quantityInput = screen.getByTestId("change-amount");

    userEvent.click(quantityInput);
    const updatedValue = parseInt(quantityInput.value) + 1;
    expect(updatedValue).toBe(2);
  });

  test("Decreasing amount of book after click on the decreasing button", () => {
    render(<InputAmount book={{ price: 10, amount: 1 }} />);

    const quantityInput = screen.getByTestId("change-amount");

    userEvent.click(quantityInput);
    const updatedValue = parseInt(quantityInput.value) - 1;
    expect(updatedValue).toBe(0);
  });

  test("Total price changes after changing quantity", () => {
    render(<InputAmount book={{ price: 10, amount: 3 }} />);

    const quantityInput = screen.getByTestId("change-amount");
    const totalPrice = screen.getByTestId("total-price");
    userEvent.type(quantityInput, "3");
    expect(totalPrice.textContent).toBe((3 * 10).toFixed(2).toString());
  });
});
