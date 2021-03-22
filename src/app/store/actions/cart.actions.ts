import { Product } from "../../modules/product/models/product.model";

export class AddProductToCart {
  static type = "[Products] Add To Cart";
  constructor(public readonly payload: Product["id"], public readonly qty: number) {
  }
}

export class UpdateCartItems {
  static type = "[Cart] Update Cart Items";
  constructor(public readonly payload: Product["id"], public readonly qty: number, public readonly increment: boolean, public readonly decrement: boolean) {
  }
}

export class RemoveCartItems {
  static type = "[Cart] Remove Cart Items";
  constructor(public readonly payload: Product["id"]) {
  }
}

export class ResetCartItems {
  static type = "[Cart] Reset Cart Items";
  constructor() {
  }
}

export type CartActions = AddProductToCart | UpdateCartItems | RemoveCartItems | ResetCartItems;