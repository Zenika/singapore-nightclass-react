import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { LoadingCollection } from "~/components/Collections/LoadingCollection";

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
    <div className={"bg-gray-100 p-4 md:p-10"}>
      <h1 className={"my-8 text-5xl font-bold"}>Collections</h1>

      <ul className={"grid grid-cols-3 flex-wrap gap-8"}>
        {collections.map((collection) => (
          <li key={collection.node.handle}>
            <Link
              className={`group flex flex-col justify-start border-solid hover:underline`}
              href={`/collections/${collection.node.handle}`}
            >
              <div className={"overflow-hidden rounded"}>
                <img
                  src={collection.node.image.url}
                  alt=""
                  className={
                    "aspect-square object-cover transition-transform duration-100 group-hover:scale-[1.1]"
                  }
                />
              </div>
              <p className={"flex items-center py-4 text-lg font-semibold"}>
                {collection.node.title}{" "}
                <ArrowRightIcon className={"ml-2 h-4 w-4"} />
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
