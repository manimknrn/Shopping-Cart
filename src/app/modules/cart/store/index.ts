import { CartState } from "./cart.state";
import { ProductState } from "../../product/store/product.state";
import { CartSelector } from "./cart.selector";

export const ShopState = [ProductState, CartState];

export * from "../../product/store/product.actions";
export * from "../../product/store/product.state";
// export * from "./cart.actions";