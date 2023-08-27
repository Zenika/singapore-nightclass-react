/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
const stubHoodieProductData = {
  data: {
    product: {
      handle: "hoodie",
      title: "Hoodie",
      description:
        "This hoodie is the perfect choice for comfort and warmth. Meticulously crafted from 100% cotton, the hoodie features a soft, plush fleece interior and a unisex sizing design. Soft and lightweight, it's sure to be your go-to for chilly days.",
      featuredImage: {
        id: "gid://shopify/ProductImage/39774600036374",
        url: "https://cdn.shopify.com/s/files/1/0688/1755/1382/products/GreenHoodie01.jpg?v=1675455175",
      },
      variants: {
        edges: [
          {
            node: {
              price: {
                amount: "90.0",
                currencyCode: "CAD",
              },
            },
          },
        ],
      },
    },
  },
};

export const REQUEST = {
  GET_PRODUCT: `https://mock.shop/api?query={product(handle: "hoodie"){handle title description featuredImage {id url} variants(first: 1) { edges { node { price { amount currencyCode } } } }}}`,
};

export async function mockFetch(url: string) {
  switch (url) {
    case REQUEST.GET_PRODUCT: {
      return {
        ok: true,
        status: 200,
        json: async () => {
          return Promise.resolve(stubHoodieProductData);
        },
      };
    }
    default: {
      throw new Error(`Unhandled request: ${url}`);
    }
  }
}

beforeAll(() => jest.spyOn(window, "fetch"));
beforeEach(() => (window.fetch as any).mockImplementation(mockFetch));
