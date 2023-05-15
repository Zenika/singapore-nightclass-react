import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type FeaturedImage = {
  id: string;
  url: string;
};

type Product = {
  id: string;
  title: string;
  description: string;
  featuredImage: FeaturedImage;
};

type Data = {
  product: Product;
};

type ApiResponse = {
  data: Data;
};

const Product = () => {
  const router = useRouter();
  const { productName } = router.query;
  const [productDetail, setProductDetail] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    if (productName && typeof productName === "string") {
      fetch(
        `https://mock.shop/api?query={product(handle: "${productName}"){id title description featuredImage {id url}}}`
      )
        .then((response) => response.json())
        .then((e: ApiResponse) => {
          if (e.data.product === null) {
            router.push("/404").catch(console.error);
          } else {
            setProductDetail(e.data.product);
          }
        })
        .catch(console.error);
    }
  }, [productName]);

  return (
    <div className={"flex grow bg-gray-100 p-4 md:p-10"}>
      {productDetail && (
        <div className="m-auto grid max-w-[80rem] grid-cols-1 gap-12 md:grid-cols-3">
          <img
            className={
              "col-span-1 aspect-square h-full w-full object-cover md:col-span-2 "
            }
            width={250}
            src={productDetail.featuredImage.url}
            alt=""
          />
          <div className="col-span-1 flex flex-col gap-4">
            <h1 className="text-5xl font-extrabold">{productDetail.title}</h1>
            <p className="max-w-xl">{productDetail.description}</p>
            <button
              className="cursor-pointer rounded bg-slate-950 p-3 text-white outline outline-2 outline-offset-2 disabled:cursor-not-allowed disabled:bg-slate-600"
              disabled
            >
              Out of stock
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
