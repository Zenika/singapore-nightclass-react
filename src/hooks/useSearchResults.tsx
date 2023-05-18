import { useQuery } from "@tanstack/react-query";

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

export function useSearchResults(query: string) {
  return useQuery(["search", query], () =>
    fetch(
      `https://mock.shop/api?query={products(first: 10, query: "title:${query}"){edges {node {id title handle images(first: 1) { edges { node { url } } } variants(first: 1) { edges { node { price { amount currencyCode } } } } } } } }`
    )
      .then((response) => response.json())
      .then(
        (jsonResponse: ProductsResponse) => jsonResponse.data.products.edges
      )
  );
}
