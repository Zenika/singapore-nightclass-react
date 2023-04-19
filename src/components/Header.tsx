import { useRouter } from "next/router";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <nav className={"grid grid-cols-3"}>
        <div className="flex grow justify-start">
          <Link className={"p-2"} href="/collections/men">
            Men
          </Link>
          <Link className={"p-2"} href="/collections/women">
            Women
          </Link>
          <Link className={"p-2"} href="/collections/unisex">
            Unisex
          </Link>
        </div>
        <div className="flex grow justify-center">
          <Link className={"p-2"} href="/">
            My Store
          </Link>
        </div>
        <div className="flex grow justify-end">
          <Link className={"p-2"} href="/cart">
            My Cart
          </Link>
        </div>
      </nav>
    </header>
  );
}
