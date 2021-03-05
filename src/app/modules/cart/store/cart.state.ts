import { Action, State } from "@ngxs/store";
import { CartItem, createCartItem, updateCartItem } from "../models/cart.model";
import * as cartActions from "./cart.actions";
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
        console.log('addProductToCart-----------', payload + ' ' + qty);

        const cartItems = getState().cartItems;
        console.log('addProductToCart-----cartItems------', cartItems);
        const findIndex = cartItems.findIndex((c: any) => payload === c.productId);
        if (findIndex > -1) {
            return patchState({
                cartItems: cartItems.map((cartdata: any, index: any) => {
                    if (index !== findIndex) {
                        return cartdata;
                    }
                    return {
                        ...cartdata,
                        quantity: cartdata.quantity + 1
                    };
                })
            });
        }

        const item = createCartItem({
            productId: payload
        }, {
            qty: qty
        });
        console.log('addProductToCart-----getState().cartItems------', getState().cartItems);
        console.log('addProductToCart-----item------', item);

        patchState({
            cartItems: [...getState().cartItems, item]
        });
    }


    // @Action(cartActions.UpdateCartItems)
    // updateProductToCart(
    //     { getState, patchState }: any,
    //     { payload, qty }: cartActions.UpdateCartItems
    // ) {
    //     console.log('updateProductToCart-----------', payload + ' ' + qty);

    //     const cartItems = getState().cartItems;
    //     console.log('updateProductToCart-----cartItems------', cartItems);

    //     const findIndex = cartItems.findIndex((c: any) => payload === c.productId);
    //     console.log('findIndex :: ', findIndex);

    //     if (findIndex > -1) {
    //         return patchState({
    //             cartItems: cartItems.map((cartdata: any, index: any) => {
    //                 console.log('cartdata :: ', cartdata);
    //                 if (index !== findIndex) {
    //                     return cartdata;
    //                 }
    //                 return {
    //                     ...cartdata,
    //                     quantity: cartdata.quantity + 1
    //                 };
    //             })
    //         });
    //     }
    // }
}
