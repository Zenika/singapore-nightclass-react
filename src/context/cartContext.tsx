import {
  createContext,
  type PropsWithChildren,
  useContext,
  useReducer,
} from "react";

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
type Item = Product & {
  quantity: number;
};

type CartState = { items: Record<string, Item> };
export enum CartActionType {
  Add = "add",
  Remove = "remove",
  Set = "set",
}
type CartAction = { type: CartActionType; item: Item };

const initialCartState: CartState = {
  items: {},
};

const CartContext = createContext<
  | {
      state: CartState;
      dispatch: React.Dispatch<CartAction>;
    }
  | undefined
>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionType.Add: {
      return {
        items: {
          ...state.items,
          [action.item.handle]: {
            ...action.item,
            quantity:
              (state.items[action.item.handle]?.quantity || 0) +
              action.item.quantity,
          },
        },
      };
    }
    case CartActionType.Remove: {
      const newQuantity = Math.max(
        (state.items[action.item.handle]?.quantity || 0) - action.item.quantity,
        0
      );
      const newState = {
        ...state,
        items: {
          ...state.items,
          [action.item.handle]: {
            ...action.item,
            quantity: newQuantity,
          },
        },
      };
      if (newQuantity === 0) {
        delete newState.items[action.item.handle];
      }
      return newState;
    }
    case CartActionType.Set: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.item.handle]: {
            ...action.item,
          },
        },
      };
    }
    default: {
      // will throw at compile time if any action is missing
      const exhaustiveCheck: never = action.type;
      throw new Error(`Unhandled action type:`, exhaustiveCheck);
    }
  }
}

function CartProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
