import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

type Product = {
  node: {
    id: string;
    title: string;
    handle: string;
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
        `https://mock.shop/api?query={products(first: 10, query: "title:${q}"){edges {node {id title handle}}}}`
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
    <div className="p-10">
      <h1 className="text-5xl font-extrabold">Search results</h1>
      <p>
        {results?.length} result(s) for {q}
      </p>
      {results && (
        <ul className="grid grid-cols-3 gap-4">
          {results.map((result) => (
            <li
              key={result.node.handle}
              className="list-none rounded border-2 border-solid border-purple-200"
            >
              <Link
                className="block bg-purple-50 p-4 capitalize hover:bg-purple-100 hover:underline"
                href={`/products/${result.node.handle}`}
              >
                {result.node.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
