import { useRouter } from "next/router";
import Link from "next/link";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useCart } from "~/context/cartContext";

export function Header() {
  const router = useRouter();
  const { state } = useCart();

  const itemsInCart = Object.values(state.items).reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearch = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const keyword = e.target.elements[0].value as string;
    router.push(`/search?q=${keyword}`).catch(console.error);
  };

  return (
    <header>
      <nav className={"grid grid-cols-3"}>
        <div className="flex grow justify-start">
          <Link className={"p-2 hover:underline"} href="/collections/men">
            Men
          </Link>
          <Link className={"p-2 hover:underline"} href="/collections/women">
            Women
          </Link>
          <Link className={"p-2 hover:underline"} href="/collections/unisex">
            Unisex
          </Link>
        </div>
        <div className="flex grow justify-center">
          <Link className={"p-2 hover:underline"} href="/">
            My Store
          </Link>
        </div>
        <div className="flex grow justify-end">
          <form onSubmit={handleSearch} className={"flex items-center"}>
            <input type="text" placeholder={"search an item"} />
            <button aria-label={"search"} className={"px-4"}>
              <MagnifyingGlassIcon className={"h-6 w-6"} />
            </button>
          </form>
          <Link
            href={"/cart"}
            aria-label={"go to cart"}
            className={"relative me-2 p-2 text-center"}
          >
            <ShoppingCartIcon className={"h-6 w-6"} />
            {itemsInCart !== 0 && (
              <div className="text-bold absolute bottom-0 right-0 h-4 w-4 rounded-full bg-red-400 text-xs text-white">
                {itemsInCart}
              </div>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
