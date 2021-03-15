import { State, Action } from "@ngxs/store";
import { Product } from "../../modules/product/models/product.model";
import { ProductsService } from "../../modules/product/services/products.service";
import * as productActions from "../actions/product.actions";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";

export interface ProductStateModel {
  [x: string]: any;
  products: Product[];
  loaded: boolean;
  loading: boolean;
  selectedProductId: number;
}

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
export class ProductState {
  constructor(private productsService: ProductsService) { }

  @Action(productActions.LoadProducts)
  loadData({ patchState }: any) {
    patchState({
      loading: true
    });

    return this.productsService.getProductList().pipe(
      tap((payload: Product[]) => {
        patchState({
          products: payload,
          loading: false
        });
      })
    );
  }
}