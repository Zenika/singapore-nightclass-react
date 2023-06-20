import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

export function useCheckout(
  options: UseMutationOptions<unknown, unknown, unknown>
) {
  return useMutation(
    ["checkout"],
    (order) =>
      fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(order),
      }),
    options
  );
}
