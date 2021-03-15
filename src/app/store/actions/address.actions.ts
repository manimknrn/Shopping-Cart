export class AddAddress {
    static type = "[Adress] Add Adress";
    constructor(public readonly payload: []) {

    }
}

export type AddressActions = AddAddress;