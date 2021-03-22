import { Product } from "../../product/models/product.model";

export class CartItem {
  productId?: Product["id"];
  quantity?: number;
  total?: number;
  id?: number;
  image_url?: string;
  name?: string;
  price?: number;
}

export function createCartItem(params: Partial<CartItem>, qty: any) {
  const quant = qty;

  return {
    total: 0,
    quantity: quant.qty,
    ...params
  } as CartItem;
}

// export function updateCartItem(params: Partial<CartItem>, qty: any) {
//   const quant = qty;

//   return {
//     total: 0,
//     quantity: quant.qty,
//     ...params
//   } as CartItem;
// }
