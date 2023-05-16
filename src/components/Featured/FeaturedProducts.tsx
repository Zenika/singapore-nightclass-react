import { useEffect, useState } from "react";
import Link from "next/link";

type Products = {
  node: {
    id: string;
    title: string;
    handle: string;
    createdAt: string;
    images: {
      edges: {
        node: {
          url: string;
        };
      }[];
    };
    variants: {
      edges: {
        node: {
          price: {
            amount: string;
            currencyCode: string;
          };
        };
      }[];
    };
  };
};
type FeaturedProductsResponse = {
  data: {
    products: {
      edges: Products[];
    };
  };
};

export const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Products[]>([]);
  useEffect(() => {
    fetch(
      "https://mock.shop/api?query={products(first: 3, sortKey: CREATED_AT, reverse: true){edges {node {id title handle createdAt images(first: 1){edges {node {url}}} variants(first: 1){edges {node {price {amount currencyCode}}}}}}}}"
    )
      .then((response) => response.json())
      .then((jsonResponse: FeaturedProductsResponse) => {
        setFeaturedProducts(jsonResponse.data.products.edges);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  return (
    <div>
      <h2 className={"mb-8 text-4xl font-bold"}>You may also like</h2>

      <ul className={"grid grid-cols-1 flex-wrap gap-8 md:grid-cols-3"}>
        {featuredProducts.map((product) => (
          <li key={product.node.handle}>
            <Link
              className={"group flex flex-col justify-start border-solid"}
              href={`/products/${product.node.handle}`}
            >
              <div className={"overflow-hidden rounded"}>
                <img
                  src={product.node.images.edges[0]?.node.url}
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
                {product.node.title}
              </p>
              <p className={"mb-4 flex items-center"}>
                {product.node.variants.edges[0]?.node.price.currencyCode}
                {product.node.variants.edges[0]?.node.price.amount}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
