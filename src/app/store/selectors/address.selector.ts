import { AddressState, AddressStateModel } from "../states/address.state";
import { Selector, State } from "@ngxs/store";

import { Injectable } from "@angular/core";

@State<AddressStateModel>({
    name: "address",
    defaults: {
        address: []
    }
})
@Injectable()
export class AddressSelector {

    @Selector([AddressState])
    static addressList(state: AddressStateModel) {
        const address = state.address;
        return address;
    }
}