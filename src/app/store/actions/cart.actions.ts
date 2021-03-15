import { Product } from "../../modules/product/models/product.model";

export class AddProductToCart {
  static type = "[Products] Add To Cart";
  constructor(public readonly payload: Product["id"], public readonly qty: number) {
  }
}

export class UpdateCartItems {
  static type = "[Cart] Update Cart Items";
  constructor(public readonly payload: Product["id"], public readonly qty: number) {
  }
}

export class RemoveCartItems {
  static type = "[Cart] Remove Cart Items";
  constructor(public readonly payload: Product["id"]) {
  }
}

export type CartActions = AddProductToCart | UpdateCartItems | RemoveCartItems;