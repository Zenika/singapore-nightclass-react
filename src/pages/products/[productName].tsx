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
    <div className={"p-10"}>
      {productDetail && (
        <>
          <h1 className="text-5xl font-extrabold">{productDetail.title}</h1>
          <div className="flex gap-4">
            <img width={250} src={productDetail.featuredImage.url} alt="" />
            <p className="max-w-xl">{productDetail.description}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
