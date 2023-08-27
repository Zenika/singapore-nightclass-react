/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CartProvider } from "~/context/cartContext";
import { REQUEST, mockFetch } from "./mockFetch";
import Product from "../products/[productName]";
import Cart from ".";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    query: {
      productName: "hoodie",
    },
  }),
}));

const renderInitialSetup = async () => {
  await mockFetch(REQUEST.GET_PRODUCT);
  const { rerender } = render(
    <CartProvider>
      <Product />
    </CartProvider>
  );

  await waitFor(async () => {
    await userEvent.click(screen.getByText("Add"));
  });

  return rerender;
};

describe("Checkout should", () => {
  it("have a clear button", async () => {
    const rerender = await renderInitialSetup();

    rerender(
      <CartProvider>
        <Cart />
      </CartProvider>
    );
    expect(screen.queryByText("Your cart is empty")).not.toBeInTheDocument();
    expect(screen.getByText("Clear cart")).toBeVisible();
  });

  it("clear cart when user click clear button", async () => {
    const rerender = await renderInitialSetup();

    rerender(
      <CartProvider>
        <Cart />
      </CartProvider>
    );
    const clearBtn = screen.getByText("Clear cart");
    await userEvent.click(clearBtn);

    expect(screen.getByText("Your cart is empty")).toBeVisible();
    expect(screen.queryByText("Checkout")).not.toBeInTheDocument();
  });
});
