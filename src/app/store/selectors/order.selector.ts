import { OrderState, OrderStateModel } from "../states/order.state";

import { Injectable } from "@angular/core";
import { Selector } from "@ngxs/store";

@Injectable()
export class OrderSelector {

    @Selector([OrderState])
    static cartItems(state: OrderStateModel) {
        const { cartItems } = Object(state.cartItems)["cart"];
        console.log('cartItems :: ', cartItems);
        const { products } = Object(state.cartItems).productState;
        return joinItems(cartItems, products);
    }

    // Cart total
    @Selector([OrderState])
    static cartTotal(state: OrderStateModel) {
        const { cartItems } = Object(state.cartItems)["cart"];
        const { products } = Object(state.cartItems).productState;
        return joinItems(cartItems, products).reduce(
            (total: any, item: any) => total + item.total,
            0
        );
    }

       // Cart total
       @Selector([OrderState])
       static finalCartTotal(state: OrderStateModel) {
           const finalTotal = Object(state.cartItems).order.finalTotal;
           return finalTotal;  
       }

    // cart quantity for cart badge
    @Selector([OrderState])
    static cartQuantity(state: OrderStateModel) {
        const { cartItems } = Object(state.cartItems)["cart"];
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