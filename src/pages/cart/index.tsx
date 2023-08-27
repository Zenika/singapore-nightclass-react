import { CartActionType, useCart } from "~/context/cartContext";
import Link from "next/link";

export default function Cart() {
  const { state, dispatch } = useCart();
  const items = Object.values(state.items);
  return (
    <div className={"flex-1 bg-gray-100 p-4 md:p-10"}>
      {items.length === 0 ? (
        <>
          <h1 className={"my-8 text-5xl font-bold"}>Your cart is empty</h1>
          <div className={"flex justify-center"}>
            <img
              className={"max-w-xl"}
              src="/undraw_empty_cart.svg"
              alt="an empty cart"
            />
          </div>
        </>
      ) : (
        <>
          <h1 className={"my-8 text-5xl font-bold"}>Your cart</h1>
          <table className={"w-full table-auto text-lg font-medium"}>
            <thead>
              <tr>
                <th
                  className={
                    "border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"
                  }
                >
                  Product
                </th>
                <th
                  className={
                    "border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"
                  }
                >
                  Quantity
                </th>
                <th
                  className={
                    "border-b p-4 pb-3 pl-8 pt-0 text-left font-medium text-slate-400 dark:border-slate-600 dark:text-slate-200"
                  }
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody className={"bg-white dark:bg-slate-800"}>
              {items.map((item) => (
                <tr key={item.handle}>
                  <td
                    className={
                      "flex gap-4 border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                    }
                  >
                    <img
                      src={item.featuredImage.url}
                      className={
                        "aspect-square h-[125px] w-[125px] object-cover"
                      }
                      alt=""
                    />
                    <div className={"flex flex-col justify-around"}>
                      <p>{item.title}</p>
                      <p>${item.variants.edges[0]?.node.price.amount}</p>
                    </div>
                  </td>
                  <td
                    className={
                      "border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                    }
                  >
                    {item.quantity}
                  </td>
                  <td
                    className={
                      "border-b border-slate-100 p-4 pl-8 text-slate-500 dark:border-slate-700 dark:text-slate-400"
                    }
                  >
                    $
                    {item.quantity *
                      (item.variants.edges[0]?.node.price.amount || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan={2}
                  className={
                    "border-t p-4 pl-8 pt-0 pt-3 text-left font-medium text-slate-900 dark:border-slate-600 dark:text-slate-200"
                  }
                >
                  TOTAL
                </td>
                <td
                  className={
                    "border-t p-4 pl-8 pt-0 pt-3 text-left font-medium text-slate-900 dark:border-slate-600 dark:text-slate-200"
                  }
                >
                  $
                  {items.reduce((total, item) => {
                    return (
                      total +
                      item.quantity *
                        (item.variants.edges[0]?.node.price.amount || 0)
                    );
                  }, 0)}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className="flex justify-end">
            <button
              onClick={() =>
                dispatch({
                  type: CartActionType.Reset,
                })
              }
              className="mt-4 cursor-pointer rounded bg-slate-950 p-3 px-10 text-white outline outline-2 outline-offset-2 outline-transparent disabled:cursor-not-allowed disabled:bg-slate-600"
            >
              Clear cart
            </button>
            <Link
              href={"/cart/checkout"}
              className="mt-4 cursor-pointer rounded bg-slate-950 p-3 px-10 text-white outline outline-2 outline-offset-2 outline-transparent disabled:cursor-not-allowed disabled:bg-slate-600"
            >
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
