export class AddAddress {
    static type = "[Adress] Add Adress";
    constructor(public readonly payload: []) {
    }
}

export class ResetAddress {
    static type = "[Adress] Reset Adress";
    constructor() {
    }
}

export type AddressActions = AddAddress | ResetAddress;