import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type ProductNode = {
  title: string;
  id: string;
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

type ProductEdge = {
  node: ProductNode;
};

type ProductConnection = {
  edges: ProductEdge[];
};

type Collection = {
  title: string;
  products: ProductConnection;
};

type Data = {
  collectionByHandle: Collection;
};

type Response = {
  data: Data;
};

export default function Collection() {
  const router = useRouter();
  const { collectionName } = router.query;
  const [products, setProducts] = useState<ProductEdge[]>([]);

  useEffect(() => {
    if (collectionName && typeof collectionName === "string") {
      fetch(
        `https://mock.shop/api?query={collectionByHandle(handle: "${collectionName}"){title products(first: 10){edges {node {title id handle images(first: 1) { edges { node { url } } } variants(first: 1) { edges { node { price { amount currencyCode } } } } } } } } }`
      )
        .then((response) => response.json())
        .then((result: Response) =>
          setProducts(result.data.collectionByHandle.products.edges)
        )
        .catch(console.error);
    }
  }, [collectionName]);

  return (
    <div className={"bg-gray-100 p-10"}>
      <h1 className={"my-8 text-5xl font-bold"}>Collection {collectionName}</h1>

      <ul className={"grid grid-cols-3 flex-wrap gap-8"}>
        {products.map((product) => (
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
}
