export class CloneOrderList {
    static type = "[Order] Clone Order";
    constructor(public readonly payload: []) {
    }
}

export class FinalTotal {
    static type = "[Order] Final Total";
    constructor(public readonly payload: number) {
    }
}

export type OrderActions = CloneOrderList | FinalTotal;