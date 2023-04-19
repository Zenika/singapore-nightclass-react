import { useEffect, useState } from "react";
import Link from "next/link";

type CollectionEdge = {
  cursor: string;
  node: {
    id: string;
    handle: string;
    title: string;
    description: string;
    image: {
      id: string;
      url: string;
    };
  };
};

type CollectionData = {
  collections: {
    edges: CollectionEdge[];
  };
};

type ShopData = {
  data: CollectionData;
};

export default function Collections() {
  const [collections, setCollections] = useState<CollectionEdge[]>([]);

  useEffect(() => {
    fetch(
      "https://mock.shop/api?query={collections(first:%2010){edges%20{cursor%20node%20{id%20handle%20title%20description%20image%20{id%20url}}}}}"
    )
      .then((response) => response.json())
      .then((result: ShopData) => setCollections(result.data.collections.edges))
      .catch(console.error);
  });

  return (
    <div className={"p-10"}>
      <h1 className={"text-5xl"}>Collections</h1>

      <ul className={"flex flex-wrap gap-4"}>
        {collections.map((collection) => (
          <li key={collection.node.handle}>
            <Link
              className={
                "flex rounded border-[1px] border-solid border-pink-400 bg-pink-100 p-4 hover:bg-pink-200"
              }
              href={`/collections/${collection.node.handle}`}
            >
              {collection.node.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
