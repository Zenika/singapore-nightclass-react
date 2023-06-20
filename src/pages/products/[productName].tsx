import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CartActionType, useCart } from "~/context/cartContext";

type FeaturedImage = {
  id: string;
  url: string;
};

type Product = {
  handle: string;
  title: string;
  description: string;
  featuredImage: FeaturedImage;
  variants: {
    edges: { node: { price: { amount: number; currencyCode: string } } }[];
  };
};

type Data = {
  product: Product;
};

type ApiResponse = {
  data: Data;
};

const Product = () => {
  const router = useRouter();
  const { state, dispatch } = useCart();
  const { productName } = router.query;
  const [productDetail, setProductDetail] = useState<Product | undefined>(
    undefined
  );

  const quantity =
    productDetail?.handle !== undefined
      ? state.items[productDetail.handle]?.quantity || 0
      : 0;
  const [quantityInput, setQuantityInput] = useState(0);

  useEffect(() => {
    setQuantityInput(quantity);
  }, [quantity]);

  const handleSubmit = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    // const quantity = e.target.elements[0].value as string;
    // console.log("should update QT to", quantity);
    if (productDetail) {
      dispatch({
        type: CartActionType.Set,
        item: { ...productDetail, quantity: quantityInput },
      });
    }
  };

  useEffect(() => {
    if (productName && typeof productName === "string") {
      fetch(
        `https://mock.shop/api?query={product(handle: "${productName}"){handle title description featuredImage {id url} variants(first: 1) { edges { node { price { amount currencyCode } } } }}}`
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
    <div className={"flex grow flex-col bg-gray-100 p-4 md:p-10"}>
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
            <p className="max-w-xl">
              {productDetail.variants.edges[0]?.node.price.currencyCode}
              {productDetail.variants.edges[0]?.node.price.amount}
            </p>
            {quantity === 0 ? (
              <button
                className="cursor-pointer rounded bg-slate-950 p-3 text-white outline outline-2 outline-offset-2 outline-transparent disabled:cursor-not-allowed disabled:bg-slate-600"
                onClick={() =>
                  dispatch({
                    type: CartActionType.Add,
                    item: { ...productDetail, quantity: 1 },
                  })
                }
              >
                Add
              </button>
            ) : (
              <div className={"flex"}>
                <button
                  className="h-[48px]cursor-pointer w-[48px] rounded bg-slate-950 p-3 text-white outline outline-2 outline-offset-2 outline-transparent disabled:cursor-not-allowed disabled:bg-slate-600"
                  onClick={() =>
                    dispatch({
                      type: CartActionType.Remove,
                      item: { ...productDetail, quantity: 1 },
                    })
                  }
                >
                  -
                </button>

                <form onSubmit={handleSubmit} className="flex flex-1">
                  <input
                    type="text"
                    pattern="[0-9]+"
                    className={"flex-1 px-2 text-center"}
                    value={quantityInput}
                    onChange={(e) => {
                      setQuantityInput(Number.parseInt(e.target.value));
                    }}
                  />
                  <button type={"submit"} className={"sr-only"}>
                    Update quantity
                  </button>
                </form>

                <button
                  className="h-[48px] w-[48px] cursor-pointer rounded bg-slate-950 p-3 text-white outline outline-2 outline-offset-2 outline-transparent disabled:cursor-not-allowed disabled:bg-slate-600"
                  onClick={() =>
                    dispatch({
                      type: CartActionType.Add,
                      item: { ...productDetail, quantity: 1 },
                    })
                  }
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
