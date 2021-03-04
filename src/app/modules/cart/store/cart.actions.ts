import { Product } from "../../product/models/product.model";

export class AddProductToCart {
  static type = "[Products] Add To Cart";
  constructor(public readonly payload: Product["id"], public readonly qty: number) {
    
  }
}

export class LoadCartItems {
  static type = "[Cart] Load Cart Items";
}

export class RemoveCartItems {
  static type = "[Cart] Remove Cart Items";
  constructor(public readonly payload: Product["id"]) {
    
  }
}

export type CartActions = AddProductToCart | LoadCartItems | RemoveCartItems;