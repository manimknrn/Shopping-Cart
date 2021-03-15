import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from './models/product.model';
import { AddProductToCart } from '../../store/actions/cart.actions';
import { LoadProducts } from '../../store/actions/product.actions';
import { ProductSelector } from '../../store/selectors/product.selector';
import { Router } from '@angular/router';
import { ProductsService } from './services/products.service';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Select(ProductSelector.products)
  products$?: Observable<Product[]>;

  @Select((state: any) => state.productState.loading)
  loading$?: Observable<boolean>;

  constructor(readonly cartService: CartService, private router: Router, private store: Store, private _snackBar: MatSnackBar, public productService: ProductsService) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadProducts());
  }

  onAddToCart({ id, quantity }: Product): void {
    this._snackBar.open('Item added to Cart', 'Close', {
      duration: 2000,
    });

    this.store.dispatch(new AddProductToCart(Number(id), Number(quantity)));
  }

  preview(src: any) {
    this.productService.previewItems$.next(src);
    this.router.navigate(['../productPreview']);
  }

}
