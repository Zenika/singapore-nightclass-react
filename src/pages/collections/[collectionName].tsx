import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

type ProductNode = {
  title: string;
  id: string;
  handle: string;
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
        `https://mock.shop/api?query={collectionByHandle(handle:%20%22${collectionName}%22){title%20products(first:%2010){edges%20{node%20{title%20id%20handle}}}}}`
      )
        .then((response) => response.json())
        .then((result: Response) =>
          setProducts(result.data.collectionByHandle.products.edges)
        )
        .catch(console.error);
    }
  }, [collectionName]);

  return (
    <div className={"p-10"}>
      <h1 className={"text-5xl"}>Collection {collectionName}</h1>

      <ul className={"flex flex-wrap gap-4"}>
        {products.map((product) => (
          <li key={product.node.handle}>
            <Link
              className={
                "flex rounded border-[1px] border-solid border-teal-400 bg-teal-100 p-4 hover:bg-teal-200"
              }
              href={`/products/${product.node.handle}`}
            >
              {product.node.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
