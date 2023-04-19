import { useRouter } from "next/router";
import Link from "next/link";

export function Header() {
  const router = useRouter();

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
          <form onSubmit={handleSearch} className={"flex items-center"}>
            <input type="text" placeholder={"search an item"} />
            <button aria-label={"search"} className={"px-4"}>
              🔎
            </button>
          </form>
        </div>
      </nav>
    </header>
  );
}
