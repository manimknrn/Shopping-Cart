import { Injectable } from "@angular/core";
import { RouterState } from "@angular/router";
import { Selector, State } from "@ngxs/store";
import { Product } from "../../modules/product/models/product.model";
import { ProductState, ProductStateModel } from "../states/product.state";

@State<ProductStateModel>({
    name: "productState",
    defaults: {
        products: [],
        loaded: false,
        loading: false,
        selectedProductId: 0
    }
})
@Injectable()
export class ProductSelector {

    @Selector([ProductState])
    static products(state: ProductStateModel): Product[] {

        return state.products;
    }

    @Selector([RouterState])
    static selectedProduct(state: ProductStateModel, routerState: any): any {
        const { id } = routerState.state.params;
        let prod = state.products.find(product => {
            product.id === +id
        })
        return prod;
    }
}