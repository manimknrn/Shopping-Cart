import * as addressActions from "../actions/address.actions";

import { Action, State } from "@ngxs/store";

import { Injectable } from "@angular/core";

export interface AddressStateModel {
    address: [];
}

@State<AddressStateModel>({
    name: "address",
    defaults: {
        address: []
    }
})

@Injectable()
export class AddressState {

        // deleted cart items
        @Action(addressActions.AddAddress)
        updateAddress (
            { patchState }: any,
            { payload }: any
        ) {
            patchState({
                address: payload.value
            });
        }

}