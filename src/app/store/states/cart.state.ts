import * as cartActions from "../actions/cart.actions";

import { Action, State } from "@ngxs/store";
import { CartItem, createCartItem } from "../../modules/cart/models/cart.model";

import { Injectable } from "@angular/core";

export interface CartStateModel {
    cartItems: CartItem[];
}

@State<CartStateModel>({
    name: "cart",
    defaults: {
        cartItems: []
    }
})

@Injectable()
export class CartState {

    // deleted cart items
    @Action(cartActions.RemoveCartItems)
    removeCartItems(
        { getState, patchState }: any,
        { payload }: any
    ) {
        const cartItems = getState().cartItems;
        patchState({
            cartItems: cartItems.filter((obj: CartItem) => {
                return obj.productId !== payload["id"]
            })
        });
    }

    // add to cart
    @Action(cartActions.AddProductToCart)
    addProductToCart(
        { getState, patchState }: any,
        { payload, qty }: cartActions.AddProductToCart
    ) {
        const cartItems = getState().cartItems;
        const findIndex = cartItems.findIndex((c: any) => payload === c.productId);
        if (findIndex > -1) {
            return patchState({
                cartItems: cartItems.map((cartdata: any, index: any) => {
                    if (index !== findIndex) {
                        return cartdata;
                    }
                    return {
                        ...cartdata,
                        // quantity: qty
                        quantity: cartdata.quantity + qty
                    };
                })
            });
        } else {
            const item = createCartItem({
                productId: payload
            }, {
                qty: qty
            });

            patchState({
                cartItems: [...getState().cartItems, item]
            });
        }
    }

    // add to cart
    @Action(cartActions.UpdateCartItems)
    updateProductToCart(
        { getState, patchState }: any,
        { payload, qty, increment, decrement }: cartActions.UpdateCartItems
    ) {
        const cartItems = getState().cartItems;
        const findIndex = cartItems.findIndex((c: any) => payload === c.productId);
        if (findIndex > -1) {
            return patchState({
                cartItems: cartItems.map((cartdata: any, index: any) => {
                    if (index !== findIndex) {
                        return cartdata;
                    }
                    if (increment) {
                        return {
                            ...cartdata,
                            // quantity: qty 
                            quantity: cartdata.quantity + 1
                        };
                    }

                    if (decrement) {
                        return {
                            ...cartdata,
                            // quantity: qty 
                            quantity: cartdata.quantity - 1
                        };
                    }
                })
            });
        }
    }

    // reset to cart
    @Action(cartActions.ResetCartItems)
    resetProductToCart(
        { patchState }: any
    ) {
        patchState({
            cartItems: []
        });
    }

}
