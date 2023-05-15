import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

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

  useEffect(() => {
    if (q && typeof q === "string")
      fetch(
        `https://mock.shop/api?query={products(first: 10, query: "title:${q}"){edges {node {id title handle images(first: 1) { edges { node { url } } } variants(first: 1) { edges { node { price { amount currencyCode } } } } } } } }`
      )
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse: ProductsResponse) => {
          setResults(jsonResponse.data.products.edges);
        })
        .catch(console.error);
  }, [q]);

  return (
    <div className="p-4 md:p-10">
      <h1 className="text-5xl font-extrabold">Search results</h1>
      <p className={"mb-8"}>
        {results?.length} result(s) for {q}
      </p>
      {results && (
        <ul className="grid grid-cols-3 gap-8">
          {results.map((result) => (
            <li key={result.node.handle}>
              <Link
                className={"group flex flex-col justify-start border-solid"}
                href={`/products/${result.node.handle}`}
              >
                <div className={"overflow-hidden rounded"}>
                  <img
                    src={result.node.images.edges[0]?.node.url}
                    alt=""
                    className={
                      "aspect-square object-cover transition-transform duration-100 group-hover:scale-[1.1]"
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
                  {result.node.variants.edges[0]?.node.price.currencyCode}
                  {result.node.variants.edges[0]?.node.price.amount}
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
