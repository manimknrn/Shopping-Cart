import { CartState, CartStateModel } from "../states/cart.state";
import { ProductState, ProductStateModel } from "../states/product.state";
import { Selector, State } from "@ngxs/store";

import { Injectable } from "@angular/core";

@State<CartStateModel>({
    name: "cart",
    defaults: {
        cartItems: []
    }
})

@Injectable()
export class CartSelector {

    @Selector([ProductState])
    static cartItems(state: CartStateModel, productState: ProductStateModel) {
        const { cartItems } = state;
        const products = productState.products;
        return joinItems(cartItems, products);
    }

    // Cart total
    @Selector([ProductState])
    static cartTotal(state: CartStateModel, productState: ProductStateModel) {
        const { cartItems } = state;
        const products = productState.products;
        return joinItems(cartItems, products).reduce(
            (total: any, item: any) => total + item.total,
            0
        );
    }

    // cart quantity for cart badge
    @Selector([ProductState])
    static cartQuantity(state: CartStateModel) {
        const { cartItems } = state;
        return cartItems.reduce(
            (a: any, b: any) => a + b.quantity,
            0
        );
    }

}

function joinItems(cartItems: any[], products: any[]) {
    return cartItems.map(cartItem => {
        const product = products.find(p => p.id === cartItem.productId);
        return {
            ...cartItem,
            ...product,
            total: cartItem.quantity * product.price
        };
    });
}