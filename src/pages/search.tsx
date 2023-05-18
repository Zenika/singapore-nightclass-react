import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingProduct } from "~/components/Product/LoadingProduct";
import { NoResults } from "~/components/Search/NoResults";
import { Error } from "~/components/Search/Error";

type Product = {
  node: {
    id: string;
    title: string;
    handle: string;
    images: {
      edges: {
        node: {
          url: string;
        };
      }[];
    };
    variants: {
      edges: { node: { price: { amount: number; currencyCode: string } } }[];
    };
  };
};

type ProductsResponse = {
  data: {
    products: {
      edges: Product[];
    };
  };
};

const Search = () => {
  const router = useRouter();
  const { q } = router.query;
  const [results, setResults] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // TODO:#2 we should handle error with more than just logging to the console
  // TODO:#4 we can replace most of the code we wrote by using `useQuery` from `react-query`
  // The first argument is an array to tell react-query when to call the function again
  // similar to an array of dependencies for useEffect
  // The second argument is the function that will be called to get the data
  // TODO:#5 we can now extract our query in its own function/file then we can reuse it somewhere else (and test it) more easily!
  const query: string = q && typeof q === "string" ? q : "";

  useEffect(() => {
    if (query) {
      setLoading(true);
      // TODO:#2 we should reset the error if there's any
      fetch(
        `https://mock.shop/api?query={products(first: 10, query: "title:${query}"){edges {node {id title handle images(first: 1) { edges { node { url } } } variants(first: 1) { edges { node { price { amount currencyCode } } } } } } } }`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse: ProductsResponse) => {
          setResults(jsonResponse.data.products.edges);
          setLoading(false);
        })
        .catch((err) => {
          // TODO:#2 we should handle error with more than just logging to the console
          // update the state to reflect the error in the UI
          console.error(err);
        });
    }
  }, [query]);

  return (
    <div className="p-4 md:p-10">
      <h1 className="mb-4 text-5xl font-extrabold">Search results</h1>
      <p className={"mb-8"}>
        {results?.length || 0} result(s) for {q}
      </p>
      {loading && (
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
      {/* TODO:#2 display `Error.tsx` when there's a failure */}
      {/* TODO:#3 display `NoResults.tsx` when there's no results */}
      {!loading && results && (
        <ul className="grid grid-cols-3 gap-8">
          {results.map((result) => (
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
