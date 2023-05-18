import { useRouter } from "next/router";
import Link from "next/link";
import { LoadingProduct } from "~/components/Product/LoadingProduct";
import { NoResults } from "~/components/Search/NoResults";
import { Error } from "~/components/Search/Error";
import { useSearchResults } from "~/hooks/useSearchResults";

const Search = () => {
  const router = useRouter();
  const { q } = router.query;
  // TODO:#5 we can now extract our query in its own function/file then we can reuse it somewhere else (and test it) more easily!
  const query: string = q && typeof q === "string" ? q : "";

  const { data, isLoading, isError } = useSearchResults(query);

  return (
    <div className="p-4 md:p-10">
      <h1 className="mb-4 text-5xl font-extrabold">Search results</h1>
      <p className={"mb-8"}>
        {data?.length || 0} result(s) for {q}
      </p>
      {isLoading && (
        <ul className="grid grid-cols-3 gap-8">
          <li>
            <LoadingProduct />
          </li>
          <li>
            <LoadingProduct />
          </li>
          <li>
            <LoadingProduct />
          </li>
        </ul>
      )}
      {!isLoading && isError && <Error />}
      {!isLoading && !isError && data && data.length === 0 && <NoResults />}
      {!isLoading && !isError && data && data.length > 0 && (
        <ul className="grid grid-cols-3 gap-8">
          {data.map((result) => (
            <li key={result.node.handle}>
              <Link
                className={"group flex flex-col justify-start border-solid"}
                href={`/products/${result.node.handle}`}
              >
                <div
                  className={"relative h-0 overflow-hidden rounded pt-[100%]"}
                >
                  <img
                    src={result.node.images.edges[0]?.node.url}
                    alt=""
                    className={
                      "absolute left-0 top-0 aspect-square h-auto h-full max-w-full object-cover transition-transform duration-100 group-hover:scale-[1.1]"
                    }
                  />
                </div>
                <p
                  className={
                    "mt-4 flex items-center text-lg font-semibold group-hover:underline"
                  }
                >
                  {result.node.title}
                </p>
                <p className={"mb-4 flex items-center"}>
                  ${result.node.variants.edges[0]?.node.price.amount}{" "}
                  {result.node.variants.edges[0]?.node.price.currencyCode}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
