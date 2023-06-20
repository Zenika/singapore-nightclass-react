import Link from "next/link";
import { useRouter } from "next/router";
import { CartActionType, useCart } from "~/context/cartContext";
import { useCheckout } from "~/hooks/useCheckout";
import { type OrderSchema, orderSchema } from "~/models/order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function Checkout() {
  const router = useRouter();
  const { dispatch } = useCart();
  const { mutate } = useCheckout({
    onSuccess: () => {
      console.log("Order sent!");
      dispatch({ type: CartActionType.Reset });
      router
        .push("/cart/confirmation")
        .catch((e) => console.log("failed to go to ", e));
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderSchema>({
    resolver: zodResolver(orderSchema),
  });

  // TODO: #1 use HTML native validation to mark the `first-name` as required
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required
  // TODO: #2 use HTML native validation to build a more complex validation
  // ref: https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation
  // - email is valid
  // - firstname is not empty
  // - credit number:  FIXME: ONLY FOR DEMO PURPOSE - DO NOT STORE IN DB!
  //    - is not empty
  //    - pattern is one of:
  //      - Master   5      + 15 digits
  //      - Visa     4      + 13 | 16 digits
  // - date expiry
  //      - is not empty
  //      - format is MM/YY
  // - ccv
  //      - is not empty
  //      - format is 3 digits
  // TODO: #3 disable the native validation so the javascript function `handleSubmit` is called
  // and try to mimic the validation for a required field there.
  // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#novalidate
  // TODO: #4 create custom rules and validation for the `cardnumber` field
  // TODO: #5 display error messages for the fields you checked
  // TODO: #6 define a `zod` type for our form
  // ref: https://zod.dev/
  // you can remove a few field from the form to start with a smaller subset of field to handle
  // TODO: use `react-hook-form` to manage our form and error messages
  // ref: https://react-hook-form.com/
  // ref: https://react-hook-form.com/get-started#Integratinganexistingform
  // ref:
  // ref:
  //react-hook-form.com/get-started#Integratinganexistingform
  // TODO: #6bis (optional) use the same rules on the server side in the `/api/checkout.ts` file

  return (
    <div className="p-4 md:p-10">
      <h1 className="mb-4 text-5xl font-extrabold">Checkout</h1>

      <form onSubmit={handleSubmit((data) => mutate(data))} noValidate>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First name
              </label>
              <div className="mt-2">
                <input
                  required
                  type="text"
                  {...register("firstName")}
                  id="first-name"
                  autoComplete="given-name"
                  className={`${
                    errors.firstName?.message ? "ring-red-400" : "ring-gray-300"
                  } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {errors.firstName?.message && (
                  <p className="text-red-400">{errors.firstName?.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("lastName")}
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  required
                  id="email"
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  className={`${
                    errors.email?.message ? "ring-red-400" : "ring-gray-300"
                  } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {errors.email?.message && (
                  <p className="text-red-400">{errors.email?.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="cardnumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Credit card number
              </label>
              <div className="mt-2">
                <input
                  required
                  minLength={13}
                  maxLength={16}
                  pattern="^(4\d{12}|4\d{15}|5\d{15})$"
                  title="Supported cards: Visa, Mastercard"
                  type="text"
                  {...register("cardnumber")}
                  id="cardnumber"
                  autoComplete="cc-number"
                  className={`${
                    errors.cardnumber?.message
                      ? "ring-red-400"
                      : "ring-gray-300"
                  } block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
                {errors.cardnumber?.message && (
                  <p className="text-red-400">{errors.cardnumber?.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href={"/cart/"}
            className="mt-4 cursor-pointer rounded p-3 px-10 text-slate-950 outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-[-webkit-focus-ring-color]"
          >
            Back to cart
          </Link>
          <button
            type={"submit"}
            className="mt-4 cursor-pointer rounded bg-slate-950 p-3 px-10 text-white outline-2 outline-offset-2"
          >
            Place order
          </button>
        </div>
      </form>
    </div>
  );
}
