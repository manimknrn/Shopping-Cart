import * as orderActions from "../actions/order.actions";

import { Action, State } from "@ngxs/store";

import { Injectable } from "@angular/core";

export interface OrderStateModel {
    cartItems: [];
    finalTotal: number
}

@State<OrderStateModel>({
    name: "order",
    defaults: {
        cartItems: [],
        finalTotal: 0
    }
})

@Injectable()
export class OrderState {

    // clone cart items
    @Action(orderActions.CloneOrderList)
    cloneOrderList(
        { patchState }: any,
        { payload }: any
    ) {
        patchState({
            cartItems: payload
        });
    }

    // update cart final total items
    @Action(orderActions.FinalTotal)
    updateFinalTotal(
        { patchState }: any,
        { payload }: any
    ) {
        patchState({
            finalTotal: payload
        });
    }
}